// const { getNamedAccounts, deployments } = require("hardhat");
const { ethers } = require("hardhat")
const { BLOCK_TIME } = require("../helper-hardhat-config")

module.exports = async({getNamedAccounts, deployments}) => {
    const { deploy } = deployments
    const { firstAccount } = await getNamedAccounts()
    console.log(firstAccount)

    // mockFactory = ethers.getContractFactory("MockV3Aggregator")
    const mock = await deployments.get("MockV3Aggregator")
    const mockAddress = mock.address
    console.log(`mockAddress is ${mockAddress}`)
    // dataFeedAddr
    await deploy("FundMe", {
        from: firstAccount,
        args: [BLOCK_TIME, mockAddress],
        log: true
    })
}

module.exports.tags = ["all", "fundme"]