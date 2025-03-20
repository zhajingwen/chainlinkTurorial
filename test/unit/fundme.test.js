// const { assert } = require("chai")
const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
// require("@nomicfoundation/hardhat-toolbox")
const helper = require("@nomicfoundation/hardhat-network-helpers")


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


    // unit test 
    it("test owner address", async function () {
        console.log(`firstAccount is ${firstAccount}`)
        owner = await FundMeObj.owner()
        console.log(`owner address is ${owner}`)
        assert.equal(owner, firstAccount)
    })

    it("test the fund payable", async function () {
        await FundMeObj.fund({value: ethers.parseEther("1")})
    })

    it("test the fund time expired required works", async function () {
        await helper.time.increase(65*60)
        await expect(FundMeObj.fund({value: ethers.parseEther("1")})).to.be.revertedWith("Expired!")
    })

    it("test the fund minium amount limited", async function () {
        await expect(FundMeObj.fund({value: ethers.parseEther("0.01")})).to.be.revertedWith("Fund Amount Must be Greater Than 1 USD!")
    })

    it("test the fund fucntion fund amout increase amount to target user ", async function () {
        let firstAccountAmount = await FundMeObj.funderAmount(firstAccount)
        console.log(`firstAccountAmount is ${firstAccountAmount}`)
        await FundMeObj.fund({value: ethers.parseEther("1")})
        firstAccountAmount = await FundMeObj.funderAmount(firstAccount)
        console.log(`firstAccountAmount is ${firstAccountAmount}`)
        await FundMeObj.fund({value: ethers.parseEther("3")})
        firstAccountAmount = await FundMeObj.funderAmount(firstAccount)
        console.log(`firstAccountAmount is ${firstAccountAmount}`)
    })

    it("test  transferOwner onlyowner modifier", async function () {
        const secondAccountSigner = await ethers.getSigner(secondAccount)
        // connect to secondAccount 
        const FundMeObj2 = await ethers.getContractAt("FundMe", fundmeAddr, secondAccountSigner)
        // Only owner can transfer owner right!
        await expect(FundMeObj2.transferOwner(firstAccount)).to.be.revertedWith("Only owner can transfer owner right!")
    })

    it("test  refund to funder winowClosed successfully", async function () {
        await FundMeObj.fund({value: ethers.parseEther("0.1")})
        await helper.time.increase(70*60)
        await FundMeObj.refund()
    })

    it("test  refund to funder winowClosed failed", async function () {
        await expect(FundMeObj.refund()).to.be.revertedWith("Time is not reached!")
    })
        
    it("test  refund to funder failed due to Target is reached", async function () {
        await FundMeObj.fund({value: ethers.parseEther("1")})
        await helper.time.increase(70*60)
        await expect(FundMeObj.refund()).to.be.revertedWith("Target is reached")
    })

    it("test  refund to funder failed due to You no fund any more!", async function () {
        await helper.time.increase(70*60)
        await expect(FundMeObj.refund()).to.be.revertedWith("You no fund any more!")
    })

    it("test refund to funder after the amout in mapping", async function () {
        await FundMeObj.fund({value: ethers.parseEther("0.1")})
        await helper.time.increase(70*60)
        await FundMeObj.refund()
        const amout = await FundMeObj.funderAmount(firstAccount)
        // console.log(`amout is ${amout}`)
        assert.equal(amout, 0)
        // await expect().to.be.revertedWith("You no fund any more!")
    })


})