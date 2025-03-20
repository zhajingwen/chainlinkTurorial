const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const helper = require("@nomicfoundation/hardhat-network-helpers")

// staging test
describe("this is a fundme test script", async function () {
    let FundMeObj
    let firstAccount
    let secondAccount
    let fundmeAddr

    // before all it unit test exec
    beforeEach(async function () {
        firstAccount = (await getNamedAccounts()).firstAccount
        secondAccount = (await getNamedAccounts()).secondAccount

        await deployments.fixture("all")
        const fundmeDeploy = await deployments.get("FundMe")
        fundmeAddr = fundmeDeploy.address
        console.log(`fundme deployed address is ${fundmeAddr}`)
        FundMeObj = await ethers.getContractAt("FundMe", fundmeAddr)
    })

    it("test fund and getFund function successfully", async function () {
        // let firstAccountAmount = await FundMeObj.funderAmount(firstAccount)
        // console.log(`firstAccountAmount is ${firstAccountAmount}`)
        await FundMeObj.fund({value: ethers.parseEther("1")})
        helper.time.increase(70*60)
        const tx = await FundMeObj.getFund()
        expect(tx).to.be.emit(FundMeObj, "FundWithdrawByOwner").withArgs(ethers.parseEther("1"))
    })

    it("test fund and refund function successfully", async function () {
        await FundMeObj.fund({value: ethers.parseEther("0.1")})
        helper.time.increase(70*60)
        const tx = await FundMeObj.refund()
        expect(tx).to.be.emit(FundMeObj, "refundToFunder").withArgs(ethers.parseEther("0.1"))
    })

})