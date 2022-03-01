he demo contains a basic web3 app and smart contract for minting NFTs.


RESUME :

Node version : 14.17.1  <= X < 17
==========
 
```bash

git clone <this-repo>


npm install

npx hardhat


/*
If it is not, run npm install --save-dev hardhat or yarn add --dev hardhat

Uninstall any global version of hardhat

Remove node_modules and run npm install or yarn install to install all dependencies.

Try running npx hardhat compile or npx hardhat node to check if it works.
*/


npx hardhat

npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts

 
#to run on localhost


# terminal 1
npx hardhat node


# terminal 2
npx hardhat compile
npx hardhat run scripts/sample-script.js --network localhost

# terminal 3 
npm run dev
```

Update the deployed NFT_USE_PAYMENTS contract address in `components/Home.js` 


===============

REFERENCES:

- to connect metamask wallet + mint a NFT  + list NFTs minted : 

1.1 ) https://youtu.be/meTpMP0J5E8 

1.2 ) https://fireship.io/lessons/web3-solidity-hardhat-react-tutorial 

====

2 to create a PaymentSPlitter contract and mint a NFT contract that use payment splitter 

2.1 ) https://www.youtube.com/watch?v=b5sQt4F8voA

