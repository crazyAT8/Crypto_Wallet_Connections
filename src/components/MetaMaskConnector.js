// import React, { useEffect, useState } from 'react';
// import Web3 from 'web3';

// const MetaMaskConnector = () => {
//   const [account, setAccount] = useState(null);
//   const [network, setNetwork] = useState(null);

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3 = new Web3(window.ethereum);

//       const connectMetaMask = async () => {
//         try {
//           await window.ethereum.request({ method: 'eth_requestAccounts' });
//           const accounts = await web3.eth.getAccounts();
//           const networkId = await web3.eth.net.getId();
//           const networkType = await web3.eth.net.getNetworkType();
//           setAccount(accounts[0]);
//           setNetwork({ id: networkId, type: networkType });
//         } catch (error) {
//           console.error('MetaMask connection failed:', error);
//         }
//       };

//       connectMetaMask();

//       window.ethereum.on('accountsChanged', (accounts) => {
//         setAccount(accounts[0]);
//       });

//       window.ethereum.on('chainChanged', (chainId) => {
//         window.location.reload();
//       });
//     } else {
//       console.log('MetaMask not found. Please install MetaMask.');
//     }
//   }, []);

//   return (
//     <div>
//       <h1>MetaMask Connection</h1>
//       {account ? (
//         <div>
//           <p>Connected account: {account}</p>
//           <p>Network: {network ? `${network.type} (ID: ${network.id})` : 'unknown'}</p>
//         </div>
//       ) : (
//         <p>Connecting to MetaMask...</p>
//       )}
//     </div>
//   );
// };

// export default MetaMaskConnector;

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
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          // Get accounts
          const accounts = await web3.eth.getAccounts();
          
          // Get network information
          const networkId = await web3.eth.getChainId(); // Use getChainId instead of getNetworkType

          // You can manually map networkId to a network name
          const networkName = getNetworkName(networkId);
          
          // Set the state
          setAccount(accounts[0]);
          setNetwork({ id: networkId, name: networkName });
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

  // Helper function to map chain ID to a network name
  const getNetworkName = (chainId) => {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 3:
        return 'Ropsten Testnet';
      case 4:
        return 'Rinkeby Testnet';
      case 5:
        return 'Goerli Testnet';
      case 42:
        return 'Kovan Testnet';
      default:
        return 'Unknown Network';
    }
  };

  return (
    <div>
      <h1>MetaMask Connection</h1>
      {account ? (
        <div>
          <p>Connected account: {account}</p>
          <p>Network: {network ? `${network.name} (ID: ${network.id})` : 'unknown'}</p>
        </div>
      ) : (
        <p>Connecting to MetaMask...</p>
      )}
    </div>
  );
};

export default MetaMaskConnector;

