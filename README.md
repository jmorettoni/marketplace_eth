This demo contains a basic web3 app and smart contract for minting NFTs.


RESUME :

Node version : 16.14.0
==========

see the demo here : https://marketplace-nft-navy.vercel.app/

==========
 
```bash

git clone <this-repo>


npm install

npx hardhat


/*
If it is not, run $: npm install --save-dev hardhat or yarn add --dev hardhat

and try again $: npx hardhat

If the error persist try : 

- Uninstall any global version of hardhat

- Remove node_modules and run npm install or yarn install to install all dependencies.

and try again $: npx hardhat

*/
 
 
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts
 
#to run on localhost


# terminal 1
npx hardhat node


# terminal 2
npx hardhat compile

#if you want use localhost
npx hardhat run scripts/deploy.js --network localhost

#if you want use binance testnet
npx hardhat run --network testnet scripts/deploy.js


# terminal 3 
npm run dev
```


//////////


Update the deployed NFT_USE_PAYMENTS AND THE PAYMENTS contract addresses in `components/Home.js` 


#to change the NFT image, you  also need to change the pinata_contentID . 
 
 
//////////

ps1 : edit the wallets that will receive the share in the scripts/sample-script.js

ps2 : to run  the withdral   function connect  the "Account #0"  in your metamask and login with it. 

ps 3 : to run the release function connect with the  metamaskt with the account that have share defined on the 

ps 3 : to use binance : 

- create a secrets.js with the follow structure and save on the root folder ;

```bash
{

  "mnemonic": "YOUR 12 WORDS SECRET FROM YOUR WALLET"

}
```

//////////



REFERENCES:

1 - to connect metamask wallet + mint a NFT  + list NFTs minted : 

1.1 ) https://youtu.be/meTpMP0J5E8 

1.2 ) https://fireship.io/lessons/web3-solidity-hardhat-react-tutorial 

====

2 - to create a PaymentSPlitter contract and mint a NFT contract that use payment splitter 

2.1 ) https://www.youtube.com/watch?v=b5sQt4F8voA


====

3 - to  use binance network  

https://docs.binance.org/smart-chain/developer/deploy/hardhat.html

======


4 - to host react project on githun

https://dev.to/yuribenjamin/how-to-deploy-react-app-in-github-pages-2a1f


5 - add funds to test in binance testnet

 Add funds to testnet :  https://testnet.binance.org/faucet-smart

