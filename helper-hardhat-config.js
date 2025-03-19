const DECIMALS = 8
const INITIAL_ANSWER = 3000 * 10 ** 8
const DEVELOPMENT_CHAINS = ["hardhat", "localhost"]
const BLOCK_TIME = 60 * 60
// const DATAFEED_ADDR = "0x694AA1769357215DE4FAC081bf1f309aDC325306"

const networkConfig = {
    sepolia: {
        ethUsdDataFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    eth: {
        ethUsdDataFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}


module.exports = {
    DECIMALS,
    INITIAL_ANSWER,
    DEVELOPMENT_CHAINS,
    BLOCK_TIME,
    networkConfig
}