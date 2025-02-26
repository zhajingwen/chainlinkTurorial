const { ethers } = require("hardhat")


// call contract function on chain
async function interact() {
    // transform the contract to be the object
    const contract_address = "0x88bb9c5fdB99A7EaEC1Ff56b03e83698ceC8249a"
    const FundMeFactory = await ethers.getContractFactory("contracts/FundMe.sol:FundMe")
    const FundMe = await FundMeFactory.attach(contract_address)


    // // call fund function
    // const tx = await FundMe.fund({value: ethers.parseEther("0.001")})
    // console.log(`trasaction is ${tx.hash}`)
    // // wait 5 block confirmed
    // const reciept = await tx.wait(5)
    // console.log(`reciept is ${reciept}`)



    // get contract balance
    let balance = await ethers.provider.getBalance(contract_address)
    balance = ethers.formatEther(balance)
    console.log(balance)
    const [account] = await ethers.getSigners()
    console.log(account)
    let target_user_value = await FundMe.funderAmount(account.address)
    target_user_value = ethers.formatEther(target_user_value)
    console.log(target_user_value)


}


interact().then().catch((error) => {
    console.error(error)
    process.exit(1)
})