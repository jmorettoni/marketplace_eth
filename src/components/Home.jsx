import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import NFT_USE_PAYMENTS from '../artifacts/contracts/NFT_USE_PAYMENTS.sol/NFT_USE_PAYMENTS.json';
import PAYMENTS from '../artifacts/contracts/PAYMENTS.sol/PAYMENTS.json';

 
const contractAddressNFT = '0x9224A43819123dC916C054949D2629f13A9a69f1'; //change this
const contractAddressPAY = '0x7Dc0A0658e2709695C75f3A802f357dDCbD1be0a'; //change this
const pinata_contentID = "QmRc94SegEv64s44CZ4ERhdXdD7WQxFWUJs3pr8xZMkxkr"; //change this
 
 

 let provider; 

 try{
  provider = new ethers.providers.Web3Provider(window.ethereum); 
  } catch(e) { 
    console.error(e);
}


 let signer ; 
 let contract ;
 let contractPayment ; 


 if( provider != null ){
   signer =  provider.getSigner(); 
   contract = new ethers.Contract(contractAddressNFT, NFT_USE_PAYMENTS.abi, signer);
   contractPayment = new ethers.Contract(  contractAddressPAY , PAYMENTS.abi, signer); 
 }


 
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


              //////////

                           let contentId = pinata_contentID; 
                           
                           let metadataURI = `${contentId}/${totalMinted}.json`;
                           
                           const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;
                      
                          const [isMinted, setIsMinted] = useState(false);
                          useEffect(() => {
                            getMintedStatus();
                          }, [isMinted]);

                          const getMintedStatus = async () => {
                            const result = await contract.isContentOwned(metadataURI);
                            console.log(result)
                            setIsMinted(result);
                          };

                          const mintTokenT = async () => {
                                  const connection = contract.connect(signer);
                                  const addr = connection.address;
                                  const result = await contract.payToMint(addr, metadataURI, {
                                    value: ethers.utils.parseEther('0.05'),
                                  });

                                 await result.wait();
                                 getMintedStatus();
                                 getCount();
                          }; 
              //////////
             

              return (
                <div>


                  <WalletBalance />
 
                  <div style={{position:"absolute" , top:'50px' , right:'20px'}}>
                  <button  style={{   marginRight:"10px" }} className="btn btn-primary" onClick={withdrawPaymentSplit}>withdraw NFT</button> 
                  <button style={{   }} className="btn btn-primary" onClick={releasePaymentSplit}>release Payment</button> 
                 </div>

                  <h1 style={{width:"100%",textAlign:"center"}}>NFT Collection</h1> 
                  <p style={{width:"100%",textAlign:"center"}} >This project is working on binance testnet network.</p>

                  <p style={{textAlign:"center",width:"100%"}}>   
                    <button className="btn btn-primary" onClick={mintTokenT}  >Mint the Box {totalMinted} </button> 
                      <br/>
                    <small>0.05 BNB</small> 
                  </p>

                  
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
                </div>
              );
}

function NFTImage({ tokenId, getCount }) {

  const contentId = pinata_contentID;
  const metadataURI = `${contentId}/${tokenId}.json`;
  //const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}`;
 
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
            <img className="card-img-top" src={isMinted ? imageURI : '/img/placeholder.png' }></img>
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
