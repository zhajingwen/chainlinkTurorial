const { ethers } = require("hardhat");



async function main() {
    const decimals = 8;
    const initialAnswer = 3000 * 10 ** 8
    // const contract = await ethers.getContractFactory("contracts/MockV3Aggregator.sol:MockV3Aggregator2")
    const contractFactory = await ethers.getContractFactory("MockV3Aggregator")
    const MockV3Aggregator = await contractFactory.deploy(decimals, initialAnswer)
    await MockV3Aggregator.waitForDeployment()
    const [ signer ] = await ethers.getSigners()
    console.log(`signer is ${signer.address}`)
    
}


main().then().catch((error) => {
    console.error(error)
    process.exit(1)
})