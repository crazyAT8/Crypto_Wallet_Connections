import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const MetaMaskConnector = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      const connectMetaMask = async () => {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          const networkId = await web3.eth.net.getId();
          const networkType = await web3.eth.net.getNetworkType();
          setAccount(accounts[0]);
          setNetwork({ id: networkId, type: networkType });
        } catch (error) {
          console.error('MetaMask connection failed:', error);
        }
      };

      connectMetaMask();

      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    } else {
      console.log('MetaMask not found. Please install MetaMask.');
    }
  }, []);

  return (
    <div>
      <h1>MetaMask Connection</h1>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
          <p>Network: {network ? `${network.type} (ID: ${network.id})` : 'unknown'}</p>
        </div>
      ) : (
        <p>Connecting to MetaMask...</p>
      )}
    </div>
  );
};

export default MetaMaskConnector;
