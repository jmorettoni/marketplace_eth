import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import NFT_USE_PAYMENTS from '../artifacts/contracts/NFT_USE_PAYMENTS.sol/NFT_USE_PAYMENTS.json';
import PAYMENTS from '../artifacts/contracts/PAYMENTS.sol/PAYMENTS.json';

 
const contractAddressNFT = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; //change this
const contractAddressPAY = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; //change this
const pinata_contentID = "QmRc94SegEv64s44CZ4ERhdXdD7WQxFWUJs3pr8xZMkxkr"; //change this
 

const provider = new ethers.providers.Web3Provider(window.ethereum);


// get the end user
const signer = await provider.getSigner();
const userAddr = await signer.getAddress();
// get the smart contract

 
console.log("THE SIGNER" , signer);

const contract = new ethers.Contract(contractAddressNFT, NFT_USE_PAYMENTS.abi, signer);
const contractPayment = new ethers.Contract(  contractAddressPAY , PAYMENTS.abi, signer);

 
function Home() {

              const [totalMinted, setTotalMinted] = useState(0);

              useEffect(() => {
                getCount();
              }, []);

              const getCount = async () => {
                const count = await contract.count();
                console.log(parseInt(count));
                setTotalMinted(parseInt(count));
              };

 

              const withdrawPaymentSplit = async () => { 
                    const result = await contract.withdraw(); 
                    await result.wait(); 
             }

              const releasePaymentSplit = async () => {  
                    const signer = await provider.getSigner();
                    const userAddr = await signer.getAddress();  
                    const result = await contractPayment.release_eth(userAddr); 
                    await result.wait(); 
              }

             

              return (
                <div>


                  <WalletBalance />

                  <h1 style={{width:"100%",textAlign:"center"}}>NFT Collection</h1> 
                  <div className="container">
                    <div className="row">
                      {Array(totalMinted + 1)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="col-sm">
                            <NFTImage tokenId={i} getCount={getCount} />
                          </div>
                        ))}
                    </div>
                  </div>
                  <br/><br/> 
              
                  <button className="btn btn-primary" onClick={withdrawPaymentSplit}>withdraw NFT</button> 
                  <br/><br/>
                  <button className="btn btn-primary" onClick={releasePaymentSplit}>release Payment</button> 
                </div>
              );
}

function NFTImage({ tokenId, getCount }) {

  const contentId = pinata_contentID;
  const metadataURI = `${contentId}/${tokenId}.json`;
  //const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;
//   const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result)
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    await result.wait();
        getMintedStatus();
        getCount();
  };


  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }




  return (
    <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={isMinted ? imageURI : 'img/placeholder.png'}></img>
            <div className="card-body">
              <h5 className="card-title">ID #{tokenId}</h5>
              {!isMinted ? (
                <button className="btn btn-primary" onClick={mintToken}>
                  Mint
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={getURI}>
                  Taken! Show URI
                </button>
              )}
            </div> 
    </div>
  );
}

export default Home;
