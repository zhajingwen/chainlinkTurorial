const { task } = require("hardhat/config")

task("verify-mock", "verify MockV3Aggregator")
.addParam("addr", "the MockV3Aggregator deployed address")
.setAction(async(args, hre) => {
    const decimals = 8
    const initialAnswer = 3000 * 10 ** 8
    await hre.run(
        "verify:verify",
        {
            address: args.addr,
            constructorArguments: [decimals, initialAnswer]
        }
    )
})


module.exports = {}