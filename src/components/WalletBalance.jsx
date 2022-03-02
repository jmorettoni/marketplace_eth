import { useState } from 'react';
import { ethers } from 'ethers';

function WalletBalance() {

    const [balance, setBalance] = useState('0.00');
    const [userAddr, setUserAddr] = useState('');
    
    const getBalance = async () => {
      
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);

        const signer = await provider.getSigner();
        const _userAddr = await signer.getAddress();  

        setBalance(ethers.utils.formatEther(balance));
        setUserAddr(ethers.utils.formatEther(_userAddr));
    };

     /*
        const logout = async () => {
          const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.logout();
          setBalance(ethers.utils.formatEther(balance));
      };
      */



    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Your Balance: {balance}</h5> 
          <button className="btn btn-success" onClick={() => getBalance()}>  {userAddr !="" ? (  <span>Get Balance </span>    ) : (    <span>Connect</span>  )}     </button> 
        </div>
      </div>
    );
  };
  
  export default WalletBalance;