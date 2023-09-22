import styles from '../../styles/Home.module.css';
import HeroCard from '../../components/hero-card';
import {TWERC1155Address} from "../../constants/addresses";
import {useContract,Web3Button,useContractMetadata,useTotalCount,useTotalCirculatingSupply,useAddress,useOwnedNFTs} from '@thirdweb-dev/react';

export default function ERC1155Project() {
    const address=useAddress();
    const {contract}=useContract(TWERC1155Address,"edition-drop");
    const {data:contractMetadata,isLoading:isContractMetadataIsLoading}=useContractMetadata(contract);
    const { data:contractNFTSupply,isLoading:isContractNFTSupplyIsLoading }=useTotalCount(contract);
    const {data:totalCirculatingSupply,isLoading:totalCirculatingSupplyIsLoading}=useTotalCirculatingSupply(contract,0);
    const {data:ownedNFTs,isLoading:ownedNFTsIsLoading}=useOwnedNFTs(contract,address);

return(
    <div className={styles.container}>
        <div >
        <HeroCard
                isLoading={isContractMetadataIsLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />
            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h3>Claim ERC1155</h3>
                    <p>Claim an ERC1155 NFT for 10 ERC20 Tokens</p>
                    <Web3Button 
                    contractAddress={TWERC1155Address}
                    action={(contract)=>contract.erc1155.claim(0,1)}
                    >CLaim NFT
                    </Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Contract Stats</h3>
                    <p>Total NFTs: {isContractNFTSupplyIsLoading?"Loading ...":`${contractNFTSupply?.toNumber()}`}</p>
                    <p>Total Circulating Supply Token ID 0: {totalCirculatingSupplyIsLoading?"Loading ...":`${totalCirculatingSupply?.toNumber()}`}</p>
                </div>
                {/* We use toNumber to convert the returned type BigNumber to usable form */}
                <div className={styles.componentCard}>
                    <h3>Your NFTs</h3>
                    {ownedNFTsIsLoading ? (<p>Loading ...</p>) : (ownedNFTs?.map((nft)=>(<p key={nft.metadata.id}>TokenID#{nft.metadata.id} Owned: {nft.quantityOwned}</p>)))}
                </div>
                
            </div>
        </div>
    </div>
)
}