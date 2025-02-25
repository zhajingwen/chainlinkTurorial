const { ethers } = require("hardhat")

async function main() {
    // 获取合约工厂
    const lockFactory = ethers.getContractFactory("Lock")
    // 
    const Lock = await lockFactory.deploy()
    // const Lock = (await lockFactory).deploy
    await Lock.wait
}