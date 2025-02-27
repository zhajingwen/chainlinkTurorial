// const { ethers } = require("hardhat")
const { task } = require("hardhat/config")

// call contract function


task("interact-contract")
.addParam("addr", "contract address deployed just now")
.setAction(async(taskArgs, hre) => {
    const fundMeFactory = await ethers.getContractFactory("./contracts/FundMe.sol:FundMe")
    const fundMe = await fundMeFactory.attach(taskArgs.addr)
    const tx = await fundMe.fund({value: ethers.parseEther("0.0001")})
    console.log(tx)
    await tx.wait(5)
    let balance = await ethers.provider.getBalance(taskArgs.addr)
    balance = ethers.formatEther(balance)
    console.log(`contract ${taskArgs.addr} balance is: ${balance}`)
    const [account] = await ethers.getSigners()
    console.log(account)
    let account_amount = await fundMe.funderAmount(account.address)
    account_amount = ethers.formatEther(account_amount)
    console.log(`account amount is ${account_amount}`)


    
})


module.exports = {}
