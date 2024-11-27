const { ethers } = require('ethers');
const { Wallets, Gateway, Identity } = require('@hyperledger/fabric-gateway');
const fs = require('fs'); 
const path = require('path');

async function connectToNetwork() {
    const ccpPath = path.resolve(__dirname, 'connection-profile.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const wallet = await Wallets.newFileSystemWallet('./wallet'); 
    const identity = await wallet.get('appUser');
     if (!identity) {
         console.log('An identity for the user "appUser" does not exist in the wallet'); 
        console.log('Run the registerUser.js application before retrying'); 
        return;
}

    const gateway = new Gateway(); 
    await gateway.connect(ccp, {
         wallet, 
         identity: 'appUser', 
         discovery: { enabled: true, asLocalhost: true } 
        }); 
        return gateway; 
    }

    async function listenForEvents() {
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/');
        const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        const abi = [
            "event AssetLocked(address indexed owner, address indexed tokenAddress, uint256 amountOrId, uint8 tokenType)"
        ];
        const contract = new ethers.Contract(contractAddress, abi, provider);
    
        contract.on('AssetLocked', async (uid, owner, amount, event) => {
            console.log(`AssetLocked event detected: Owner - ${owner}, Token Address - ${tokenAddress}, Amount/ID - ${amountOrId}, Token Type - ${tokenType}`);
            
            // Initiate a transaction on Hyperledger Fabric
            await initiateTransaction(uid, owner, amount);
        });
    
        console.log('Listening for AssetLocked events...');
    }
    
    async function initiateTransaction(uid, owner, amount) {
        const gateway = await connectToNetwork();
        const network = gateway.getNetwork('mychannel');
        const contract = network.getContract('mycontract');
        
        await contract.submitTransaction('CreateAsset', uid, owner, amount.toString());
        console.log('Transaction has been submitted to Hyperledger Fabric');
    }
    
    listenForEvents();

    
