const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const BlocksenseConsumer = await ethers.getContractFactory("BlocksenseConsumer");
    const consumer = await BlocksenseConsumer.deploy("0xc04b335A75C5Fa14246152178f6834E3eBc2DC7C"); // Oracle address

    await consumer.deployed();
    console.log("BlocksenseConsumer deployed to:", consumer.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
