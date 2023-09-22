import styles from '../../styles/Home.module.css';
import HeroCard from '../../components/hero-card';
import {useContract,useContractMetadata,useTokenSupply,useAddress,useTokenBalance} from '@thirdweb-dev/react';
import {TWERC20Address} from "../../constants/addresses";
import { Web3Button } from "@thirdweb-dev/react"
import Link from 'next/link'



export default function ERC20Project(){
    const {contract}=useContract(TWERC20Address,"token"); // using token unlocks a few more functinalities.
    const {data:contractMetadata,isLoading:isContractMetadataIsLoading}=useContractMetadata(contract);
    const {data:tokenSupply,isLoading:tokenSupplyIsLoading}=useTokenSupply(contract);
    const address=useAddress();
    const {data:tokenBalance,isLoading:tokenBalanceIsLoading}=useTokenBalance(contract,address);
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
                    <h1>Token Stats</h1>
                    {tokenSupplyIsLoading ? (<p>Loading ...</p>) : (<p>Total Supply: {tokenSupply?.displayValue}{tokenSupply?.symbol}</p>)}
                </div>
                <div className={styles.componentCard}>
                    <h1>Token Balance</h1>
                    {tokenBalanceIsLoading ? (<p>Loading ...</p>) : (<p>Total Balance: {tokenBalance?.displayValue}{tokenBalance?.symbol}</p>)} 
                    <Web3Button
                    contractAddress={TWERC20Address}
                    action={(contract)=>contract.erc20.burn(10)}>
                        Burn 10 Tokens
                    </Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h1>Earn Token</h1>
                    <p>Earn more tokens by Staking an ERC721 NFT</p>
                    <div>
                        <Link href="/project/staking">
                            <button style={{ fontSize: "18px", padding: "10px 20px",margin:"0.5rem", cursor: "pointer", borderRadius: "12px" }}>Stake ERC721</button>
                        </Link>
                        <Link href="/project/erc721">
                        <button style={{ fontSize: "18px", padding: "10px 20px",margin:"0.5rem", cursor: "pointer", borderRadius: "12px" }}>Claim ERC721</button>
                        </Link>
                    </div>
                </div>
        </div>
        </div>

    )
}