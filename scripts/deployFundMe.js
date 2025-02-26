const { ethers } = require("hardhat")
// 1. deploy contract
// 2. verify contract
// 3. call contract function
async function main() {
    console.log(hre.network.name)
    // create factory contract
    const fundMeFactory = await ethers.getContractFactory("contracts/FundMe.sol:FundMe")
    // delopy contract from factory given argument uint256 mean expired duration
    const FundMe = await fundMeFactory.deploy(60*60)
    // await FundMe.waitForDeployment()
    await FundMe.waitForDeployment()
    // console.log("contract has been deployed successfully, contract address is " + FundMe.target)
    console.log(`contract has been deployed successfully, contract address is ${FundMe.target}`)
    const [account] = await ethers.getSigners()
    console.log(account)


}

main().then().catch((error) => {
    console.error(error)
    process.exit(1)
})