// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBlocksenseOracle {
    function getDataById(uint32 key) external view returns (uint256 value, uint64 timestamp);
}

contract BlocksenseConsumer {
    IBlocksenseOracle public oracle;

    constructor(address oracleAddress) {
        oracle = IBlocksenseOracle(oracleAddress);
    }

    function getBTCUSDPrice() public view returns (uint256 value, uint64 timestamp) {
        return oracle.getDataById(31); // 31 is the feed ID for BTC/USD
    }

    function getETHUSDPrice() public view returns (uint256 value, uint64 timestamp) {
        return oracle.getDataById(47); // 47 is the feed ID for ETH/USD
    }

    function getEURUSDPrice() public view returns (uint256 value, uint64 timestamp) {
        return oracle.getDataById(253); // 253 is the feed ID for EUR/USD
    }
}