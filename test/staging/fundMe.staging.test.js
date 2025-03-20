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

})