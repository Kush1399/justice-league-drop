import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'kushagra_shiv';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        console.log("Phantom wallet found!");
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log("Connected with public key", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Solana object not found! Get a phantom wallet 👺");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const connectWallet = async () => {
    const { solana } = window;
    try {
      if (solana) {
        const response = await solana.connect();
        console.log("Connected with public key", response.publicKey.toString());
        setWalletAddress(response.publicKey.toString());
      }
    } catch (err) {
      console.log(err);
    }
  }

  const renderConnectWalletContainer = () => (
    <button className='cta-button connect-wallet-button' onClick={connectWallet}>
      Connect Wallet!
    </button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🦸‍♂️ Justice League Drop</p>
          <p className="sub-text">Get Your Justice League Hero NFT!</p>
          {!walletAddress && renderConnectWalletContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
