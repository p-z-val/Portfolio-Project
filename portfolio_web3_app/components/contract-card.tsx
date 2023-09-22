import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { MediaRenderer, useContract, useContractMetadata } from "@thirdweb-dev/react";

type CardProps={
    href:string,
    contractAddress:string,
    title:string,
    description:string,
}

export default function ContractCard(props:CardProps) {
    const {contract}=useContract(props.contractAddress);
    const {
        data: contractMetadata, //the image that we get back from the metadata is an IPFS hash
            isLoading: isContractMetadataLoading} =useContractMetadata(contract);
    return(
        <Link
        href={props.href}
        className={styles.componentCard}
        >
            <MediaRenderer src={contractMetadata?.image} alt={props.title}/>
            <div className='styles.CardText'>  
            <h2 className={styles.gradientText2}>{props.title}</h2> 
            <p className={styles.gradientText1}>{props.description}</p>
            </div>

        </Link>
    )
}