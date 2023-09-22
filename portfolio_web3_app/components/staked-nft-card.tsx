import styles from '../styles/Home.module.css';
import{useContract,useNFT,ThirdwebNftMedia,Web3Button} from '@thirdweb-dev/react';
import {ERC721LazyMintAddress,TWERC721StakeAddress} from "../constants/addresses";

type  NFTProps={
    tokenId:number;
};

export default function StakedNFTCard({tokenId}:NFTProps){
    const {contract:ERC721Contract}=useContract(ERC721LazyMintAddress,"signature-drop");
    const {contract:stakingContract}=useContract(TWERC721StakeAddress);
    const  {data:nftMetadata,isLoading:nftMetadataIsLoading}=useNFT(ERC721Contract,tokenId);

    return(
        <div className={styles.card}>
            <ThirdwebNftMedia
            metadata={nftMetadata?.metadata!}
            width="100%"
            height="auto"/>
            <div className={styles.nftInfoContainer}>
                <p className={styles.nftName}>{nftMetadata?.metadata.name}</p>
                <p className={styles.nftTokenID}>Token ID#{nftMetadata?.metadata.id}</p>
            </div>
            <Web3Button  contractAddress={TWERC721StakeAddress}
                action={(contract)=>contract.call("withdraw",[[tokenId]])}
                 style={{width:"100%", marginBottom: "1rem"}}>
                    Unstake
                </Web3Button>
        </div>
    )
}