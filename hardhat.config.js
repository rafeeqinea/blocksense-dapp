require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.4" },
      { version: "0.8.27" }
    ]
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};
