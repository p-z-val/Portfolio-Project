import {NFT} from "@thirdweb-dev/sdk";
import styles from '../styles/Home.module.css';
import { ThirdwebNftMedia,useAddress,useContract,Web3Button } from "@thirdweb-dev/react";
import {ERC721LazyMintAddress,TWERC721StakeAddress} from "../constants/addresses";
type NFTProps = {
    nft:NFT;
};

export default function StakeNFTCard({nft}:NFTProps){
    const address=useAddress();
    const {contract:ERC721Contract}=useContract(ERC721LazyMintAddress,"signature-drop");
    const {contract:stakingContract}=useContract(TWERC721StakeAddress);

    async function stakeNFT(nftId:number[]){ // function to stake our NFTs
        if(!address )return;

        const isApproved=await ERC721Contract?.isApproved(address,TWERC721StakeAddress);

        if(!isApproved){
            await ERC721Contract?.setApprovalForAll(TWERC721StakeAddress,true);
        };

        await stakingContract?.call("stake",[nftId]);
    }
    return(
        
        <div className={styles.card}>
        <ThirdwebNftMedia
        metadata={nft.metadata}
        width="100%"
        height="auto"/>
        <div className={styles.nftInfoContainer}>
            <p className={styles.nftName}>{nft.metadata.name}</p>
            <p className={styles.nftTokenID}>Token ID#{nft.metadata.id}</p>
        </div>
        <Web3Button 
        contractAddress={TWERC721StakeAddress}
        action = {()=>stakeNFT([parseInt(nft.metadata.id)])}
        style={{width:"100%", marginBottom: "1rem"}}>
            Stake
        </Web3Button>
        </div>
    )
}
