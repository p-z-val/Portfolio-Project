import styles from '../../styles/Home.module.css';
import HeroCard from '../../components/hero-card';
import {TipJarAddress} from "../../constants/addresses";
import {useContract,Web3Button,useContractMetadata,useAddress, useContractRead,} from '@thirdweb-dev/react';
import { ethers } from 'ethers';



export default function TipJarProject() {
    const {contract}=useContract(TipJarAddress);
    const {data:contractMetadata,isLoading:isContractMetadataIsLoading}=useContractMetadata(contract);
    const {data:tipJarBalance,isLoading:tipJarBalanceIsLoading}=useContractRead(contract,"getBalance",);
    const address=useAddress();
    const {data:owner,isLoading:ownerIsLoading}=useContractRead(contract,"owner",);

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
                    <h3>Leave a Tip</h3>
                    <p>Tips in Matic and record it on the Blockchain</p>
                    <Web3Button
                    contractAddress={TipJarAddress}
                    action={(contract)=>contract.call(
                        "tip",
                        [],
                        {
                            value:"1000000000000000"
                        }
                    )}>
                        {`Tip 0.001 Matic`}
                    </Web3Button>
                </div>
                <div className={styles.componentCard}>
                    <h3>Tip Jar Balance</h3>
                    <p>Total Tips:{tipJarBalanceIsLoading?"Loading":`${ethers.utils.formatEther(tipJarBalance)}MATIC` }</p>
                </div>
                <div className={styles.componentCard}>
                    <h3>Withdraw balance</h3>
                    <p>{ownerIsLoading?"Loading ...":owner===address?(
                        <Web3Button
                        contractAddress={TipJarAddress}
                        action={(contract)=>contract.call("withdrawFunds")}
                        onSuccess={()=>alert("Withdrawn Balance")}
                        >Withdraw Balance</Web3Button>):(<p>Only the Owner can withdraw balance</p>)}</p>
                </div>
            </div>

        </div>
    )
}