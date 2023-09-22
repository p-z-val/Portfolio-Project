import styles from '../../styles/Home.module.css';
import HeroCard from '../../components/hero-card';
import {TWERC721StakeAddress,TWERC20Address,ERC721LazyMintAddress} from "../../constants/addresses";
import {useContract,Web3Button,useContractMetadata,useOwnedNFTs,useAddress,useTokenBalance,useContractRead} from '@thirdweb-dev/react';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import StakeNFTCard from '../../components/stake-nft-card';
import StakedNFTCard from '../../components/staked-nft-card';

export default function StakingProject() {
    const address=useAddress();
    const {contract:stakingContract}=useContract(TWERC721StakeAddress); 
    const {contract:ERC20Contract}=useContract(TWERC20Address);
    const {contract:ERC721Contract}=useContract(ERC721LazyMintAddress);
    const {data:contractMetadata,isLoading:isContractMetadataIsLoading}=useContractMetadata(stakingContract);
    const {data:tokenBalance,isLoading:tokenBalanceIsLoading}=useTokenBalance(ERC20Contract,address);
    const [claimableRewards,setClaimbleRewards]=useState<BigNumber>();
    const {data: ownedNFTs, isLoading: ownedNFTsIsLoading} = useOwnedNFTs(ERC721Contract, address);
    const {data:stakedERC721Tokens,isLoading:stakedERC721TokensIsLoading}=useContractRead(stakingContract,"getStakeInfo",[address]);

    useEffect(()=>{
        if(!stakingContract||!address)return;
        async function getClaimableRewards(){
            const claimableRewards=await stakingContract?.call("getStakeInfo",[address]);
            setClaimbleRewards(claimableRewards[1]);
        }
        getClaimableRewards();
    },[address,stakingContract]);
return(
    <div className={styles.container}>
        <HeroCard
                isLoading={isContractMetadataIsLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />
            <div className={styles.grid}>
            <div className={styles.componentCard}>
                <h3>Rewards</h3>
                {tokenBalanceIsLoading ? (<p>Loading ...</p>) : (<p>Total Balance: {tokenBalance?.displayValue}{tokenBalance?.symbol}</p>)}
                {claimableRewards && (<p>Reward balance: {ethers.utils.formatEther(claimableRewards!)}</p>)}
                <Web3Button
                contractAddress={TWERC721StakeAddress}
                action={(contract)=>contract.call("claimRewards")}
                onSuccess={()=>{
                    alert("Rewards Claimed")
                    setClaimbleRewards(ethers.constants.Zero)
                }}
                isDisabled={!claimableRewards || claimableRewards.isZero()}>
                    Claim Rewards
                </Web3Button>
            </div>
            <div className={styles.componentCard}>
                <h3>Unstaked</h3>
                {ownedNFTsIsLoading? (<p>Loading ...</p>):
                (ownedNFTs && ownedNFTs.length>0?
                (ownedNFTs.map((nft)=>(
                <div key={nft.metadata.id} className={styles.nftGrid}>
                    <StakeNFTCard nft={nft}/>
                    </div>
                    ))):
                    (<p>No NFTs owned</p>))}
            </div>
            <div className={styles.componentCard}>
                <h3>Staked</h3>
                {stakedERC721TokensIsLoading ? (<p>Loading ...</p>) : (stakedERC721Tokens && stakedERC721Tokens.length>0)?(
                    stakedERC721Tokens[0].map((stakedNFT:BigNumber,index:number)=>(
                        <div key={index} className={styles.nftGrid}>
                            <StakedNFTCard tokenId={stakedNFT.toNumber() }/>
                        </div>
                    )) 
                ):(<p>No NFTs Staked</p>)}
            </div>
            </div>
    </div>
)
}