const { task } = require("hardhat/config")

// const { ethers } = require("hardhat")
// const { task } = require("hardhat/config")

task("deploy-fundme", "deploy contract FundMe").setAction(async(taskArgs, hre) => {
    const fundMeFactory = await ethers.getContractFactory("contracts/FundMe.sol:FundMe")
    const fundMe = await fundMeFactory.deploy(60*60)
    await fundMe.waitForDeployment()

    const contractAddress = await fundMe.target
    // wait for 5 block to confirm 
    fundMe.deploymentTransaction().wait(5)
    console.log(`contract address is: ${contractAddress}`)


})

module.exports = {}



// module.exports = {}
