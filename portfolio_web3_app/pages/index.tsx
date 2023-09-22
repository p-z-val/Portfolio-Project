import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import ContractCard from '../components/contract-card'
import {TWERC20Address,TWERC721StakeAddress,TWERC1155Address,ERC721LazyMintAddress,TipJarAddress,CoinFlipAddress} from "../constants/addresses";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My{" "}
            <span className={styles.gradientText0}>
                Contracts
            </span>
          </h1>

          <p className={styles.description}>
            Select a Contract to interact with
          </p>

          
        </div>

        <div className={styles.grid}>
          <ContractCard
          href="/project/erc20"
          contractAddress={TWERC20Address}
          title="ERC20"
          description="Claim ERC20 Tokens"
          />
          <ContractCard
          href="/project/staking"
          contractAddress={TWERC721StakeAddress}
          title="ERC721 Staking"
          description="Stake ERC721 tokens "
          />
          <ContractCard
          href="/project/erc721"
          contractAddress={ERC721LazyMintAddress}
          title="ERC721 LazyMint"
          description="Lazy minting ERC721A tokens"
          />
          <ContractCard
          href="/project/erc1155"
          contractAddress={TWERC1155Address}
          title="TW ERC1155"
          description="Mint ERC1155 Tokens"
          />
          
          <ContractCard
          href="/project/tipJar"
          contractAddress={TipJarAddress}
          title="TipJar"
          description="Lets us tip ERC20 Tokens"
          />

          </div>
      </div>
    </main>
  );
};

export default Home;
