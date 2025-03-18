const { network } = require("hardhat")
const { DECIMALS, INITIAL_ANSWER, DEVELOPMENT_CHAINS } = require("../helper-hardhat-config")

module.exports = async({getNamedAccounts, deployments}) => {
    // const decimals = 
    if (DEVELOPMENT_CHAINS.includes(network.name)) {
        const { firstAccount } = await getNamedAccounts()
        console.log(`accout is ${firstAccount}`)
        const { deploy } = await deployments
        await deploy("MockV3Aggregator",{
            from: firstAccount,
            args: [DECIMALS, INITIAL_ANSWER],
            log: true
        })
    } else {
        console.warn('this task is only available on development chains')
        return
    }
}
module.exports.tags = ["all", "mock"];
