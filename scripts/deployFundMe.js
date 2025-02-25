const {ethers} = require("hardhat")

async function main() {
    // create factory contract
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    // delopy contract from factory
    const FundMe = await fundMeFactory.deploy()
    // await FundMe.waitForDeployment()
    await FundMe.waitForDeployment()
    // console.log("contract has been deployed successfully, contract address is " + FundMe.target)
    console.log(`contract has been deployed successfully, contract address is ${FundMe.target}`)

}

main().then().catch(() => {
    console.error(error)
    process.exit(1)
})