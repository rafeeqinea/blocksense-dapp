const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const BlocksenseConsumer = await ethers.getContractFactory("BlocksenseConsumer");
  const blocksenseConsumer = await BlocksenseConsumer.deploy("oracleAddressHere"); // Replace with the actual oracle address

  await blocksenseConsumer.deployed();
  console.log("BlocksenseConsumer deployed to:", blocksenseConsumer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
