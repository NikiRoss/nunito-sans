import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import './index.css';

import TipsContractJson from './contracts/TipsContract.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const contractAddress = "0x04190eBb3c213b13e83791cA9Db90E4726FdE9D2";
  const contractAbi = TipsContractJson.abi;

  useEffect(() => {
    const initialize = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const userAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(userAccounts);

          const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress);
          setContract(contractInstance);
        } else {
          throw new Error("MetaMask is not installed.");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [contractAbi, contractAddress]);

  const handlePayMe = async () => {
    try {
      if (!web3 || !contract || accounts.length === 0) {
        throw new Error("Web3, contract, or accounts are not available.");
      }

      const amountInput = prompt("Enter the amount to send (in ether):");
      const amountToSend = web3.utils.toWei(amountInput, "ether");

      await contract.methods.sendTip(contractAddress, amountToSend)
        .send({ from: accounts[0], value: amountToSend });
    } catch (error) {
      if (error.code === 4001) {
        alert('Transaction was rejected by user.');
      } else {
        console.error(error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <button onClick={handlePayMe}>PAY ME</button>
    </div>
  );
}

export default App;
