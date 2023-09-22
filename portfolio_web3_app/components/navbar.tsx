import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {ConnectWallet} from '@thirdweb-dev/react'

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
        <Link href="/">
            <p className={styles.gradientText1} 
             style= {{
                cursor: "pointer",
                fontSize: "1.6rem",
                fontWeight: "bold",
            }}
            
            >Pramit's Portfolio </p>
        </Link>
        <ConnectWallet
        btnTitle="Sign In"
        modalTitle="Select Sign In Method"
        detailsBtn={() => {
          return <button style={{ fontSize: "18px", padding: "10px 30px", cursor: "pointer", borderRadius: "12px" }}>Profile</button>;
        }}
      />
    </div>
  )
}

export default Navbar