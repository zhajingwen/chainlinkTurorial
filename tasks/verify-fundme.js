// const { ethers } = require("hardhat")
const { task } = require("hardhat/config")

task("verify-fundme", "deploy contract FundMe")
.addParam("addr", "contract address deployed just now")
.setAction(async(taskArgs, hre) => {
    contract_address = taskArgs.addr
    await hre.run("verify:verify",{
        address: contract_address,
        constructorArguments: [60*60]
    })
    // const fundMeFactory = await ethers.getContractFactory("contracts/FundMe.sol:FundMe")
    // const fundMe = await fundMeFactory.deploy(60*60)
    // await fundMe.waitForDeployment()
})

module.exports = {}