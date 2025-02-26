const { ethers } = require("hardhat")


async function main() {
    contract_address = "0x88bb9c5fdB99A7EaEC1Ff56b03e83698ceC8249a"
    if (hre.network.name == 'sepolia') {
        hre.run(
            "verify:verify",
            {
                address: contract_address,
                constructorArguments: [60*60]
            }
        )
        const [account] = await ethers.getSigners()
        console.log(account)
        console.log(`deploy account is ${account}`)
    } else {
        console.warn(`chain is not correct, your chain now is ${hre.network.name}`)
    }

    
}

main().then().catch((error) => {
    console.error(error)
    process.exit(1)
})