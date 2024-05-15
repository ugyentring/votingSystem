import { useState, useEffect } from "react";
import { contractAddress, contractAbi } from "./constants/constants";
import Login from "./components/Login";
import Connected from "./components/Connected";
import "./App.css";
import { ethers } from "ethers";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  });

  //get candidates
  async function getCandidates() {
    
  }

  //get current status
  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstacne = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const status = await contractInstacne.getVotingStatus();
    setVotingStatus(status);
  }

  //set the remaining time
  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstacne = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const time = await contractInstacne.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  //function to connect wallet
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask connected: " + address);
        setIsConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask is not installed");
    }
  }

  return (
    <div>
      {isConnected ? (
        <Connected account={account} />
      ) : (
        <Login connectWallet={connectWallet} />
      )}
    </div>
  );
};

export default App;
