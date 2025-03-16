// const { ethers } = require("hardhat")
const { task } = require("hardhat/config")


task("deploy-mock", "deploy MockV3Aggregator").setAction(async(taskArgs, hre) => {
    // get contact factory
    const mockFactory = await ethers.getContractFactory("MockV3Aggregator")
    const decimals = 8;
    const initialAnswer = 3000 * 10 ** 8
    // deploy the mock contract
    const Mock = await mockFactory.deploy(decimals, initialAnswer)
    const tx = await Mock.waitForDeployment()
    const contracAddres = tx.target
    console.log(`contracAddres is ${contracAddres}`)
    console.log(`Mock's target is ${Mock.target}`)

    
})



module.exports = {}