require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url : 'https://polygon-rpc.com',
      accounts : ['57105955b08c99f1eafac6ee3e6872baf74fd15fcf38250382463fa940954f06'],
      
     
  },
  },
};
