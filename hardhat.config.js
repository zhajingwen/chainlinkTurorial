require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config()
require("./tasks")

const INFURA_KEY = process.env.INFURA_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    },
    sepolia:{
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY]: []
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_KEY
    }
  }
};
