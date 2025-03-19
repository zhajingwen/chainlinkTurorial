// const { getNamedAccounts, deployments } = require("hardhat");
const { ethers, network } = require("hardhat")
const { BLOCK_TIME, networkConfig, DEVELOPMENT_CHAINS } = require("../helper-hardhat-config")

module.exports = async({getNamedAccounts, deployments}) => {
    let ethUsdDatafeed
    let confirmations
    const { deploy } = deployments
    const { firstAccount } = await getNamedAccounts()
    console.log(firstAccount)
    if (DEVELOPMENT_CHAINS.includes(network.name)) {
    // mockFactory = ethers.getContractFactory("MockV3Aggregator")
    const mock = await deployments.get("MockV3Aggregator")
    ethUsdDatafeed = mock.address
    confirmations = 0
    // console.log(` networkConfig.sepolia.ethUsdDataFeed ${networkConfig.sepolia.ethUsdDataFeed}`)
    // console.log(`mockAddress is ${mockAddress}`)
    } else {
        ethUsdDatafeed = networkConfig[network.name].ethUsdDataFeed
        confirmations = 5
    }

    // dataFeedAddr
    await deploy("FundMe", {
        from: firstAccount,
        args: [BLOCK_TIME, ethUsdDatafeed],
        log: true,
        // wait for bolck confirmation num
        waitConfirmations: confirmations
    })
}

module.exports.tags = ["all", "fundme"]