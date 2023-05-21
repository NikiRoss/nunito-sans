import React from 'react'
import Web3 from 'web3'
import './index.css';
import { useEffect, useState } from 'react';

function App() {
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState([])

  const contractAddress = "0x28DbEc60063f982A1AF4cC61b414BDBCC39A2517"
  const contractJson = require('./contracts/TipsContract.json');
  const contractAbi = contractJson.abi;

  useEffect(() => {
    const initialize = async () => {
      console.log(contractAbi)

      if (window.ethereum) {
        // creates a new web3 instance
        const web3Instance = new Web3(window.ethereum)
        setWeb3(web3Instance)

        // requests account access
        const userAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccounts(userAccounts)

        // create new contract instance
        const contractInstance = new web3Instance.eth.Contract(contractAbi, contractAddress)
        setContract(contractInstance)
      } else {
        alert("Please install Metamask!!")
      }
    }
    initialize()
  }, [contractAbi, contractAddress])

  const handlePayMe = async () => {
    if (contract && accounts.length > 0) {
      const amountToSend = web3.utils.toWei("0.05", "ether") 
      
      try {
        await contract.methods.sendTip(contractAddress, amountToSend)
                      .send({ from: accounts[0], value: amountToSend});
      } catch (error) {
        if (error.code === 4001) {
          // User rejected transaction
          alert('Transaction was rejected by user');
        } else {
          // Other error
          console.error(error);
        }
      }
    }
  }

  return (
    <>
      <div className="container">
        <button onClick={handlePayMe}>PAY ME</button>
      </div>
    </>

  );
}

export default App;
