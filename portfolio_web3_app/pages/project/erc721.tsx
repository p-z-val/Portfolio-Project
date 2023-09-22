import styles from '../../styles/Home.module.css';
import Link from 'next/link'
import HeroCard from '../../components/hero-card';
import {ERC721LazyMintAddress} from "../../constants/addresses";
import {useContract,useContractMetadata,useTokenSupply,useAddress,useClaimedNFTSupply, useTotalCount, useOwnedNFTs, ThirdwebNftMedia} from '@thirdweb-dev/react';
import { Web3Button } from "@thirdweb-dev/react"
import React from 'react';

export default function ERC721Project() {
    const {contract}=useContract(ERC721LazyMintAddress,"signature-drop"); // using token unlocks a few more functinalities.
    const {data:contractMetadata,isLoading:isContractMetadataIsLoading}=useContractMetadata(contract);
    const {data:totalSupply,isLoading:totalSupplyIsLoading}=useTotalCount(contract);
    const {data:totalClaimedSupply,isLoading:totalClaimedSupplyIsLoading}=useClaimedNFTSupply(contract);
    const address=useAddress();
    const {data: ownedNFTs, isLoading: ownedNFTsIsLoading} = useOwnedNFTs(contract, address);
    return(
        
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                isLoading={isContractMetadataIsLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />
            </div>
            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h3>Claim ERC721</h3>
                    <p>Claim an ERC721 Token for free</p>
                    <Web3Button
                        contractAddress={ERC721LazyMintAddress}
                        action={contract=>contract.erc721.claim(1)}
                        onSuccess={()=>alert("Success, NFT Claimed")}
                    >Claim NFT</Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Contract Stats</h3>
                    <p>Total Supply: {totalSupplyIsLoading?("Loading"):(`${totalSupply?.toNumber()}`)}</p>
                    <p>Total Claimed:{totalClaimedSupplyIsLoading?("Loading"):(`${totalClaimedSupply?.toNumber()}`)}</p>
                </div>
                <div className={styles.componentCard}>
                    <h3>Your NFT Stats</h3>
                    <p>Total Owned: {ownedNFTsIsLoading?(<p>Loading ...</p>):(`${ownedNFTs?.length}`)}</p>
                        
                </div>

                
                <div className={styles.componentCard}>
                    <h3>Your NFTs</h3>
                    <div className={styles.grid} style={{justifyContent:"flex-start"}}>
                        {
                            ownedNFTsIsLoading ? (<p>Loading ...</p>) : (
                                ownedNFTs?.map((nft)=>(

                                    <div className={styles.card} key={nft.metadata.id}>
                                        <ThirdwebNftMedia
                                        metadata={nft.metadata}/>
                                        <div className={styles.cardText}>
                                            <h2>{nft.metadata.name}</h2>
                                        </div>
                                        <Link href={`/project/staking/`}>
                                            <button 
                                            style={{width:"100%",fontSize: "18px", padding: "10px 20px",margin:"0.5rem",
                                            borderRadius:"0 0 10px 10px", cursor: "pointer"}}>
                                                Stake NFT</button>

                                        </Link>
                                    </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
