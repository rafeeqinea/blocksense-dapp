// config.js

export const ORACLE_CONTRACT_ADDRESS = "0xYourContractAddress"; // Replace with your actual contract address

// ABI of the BlocksenseConsumer contract
export const ORACLE_ABI = [
    {
        "inputs": [{ "internalType": "uint32", "name": "feedId", "type": "uint32" }],
        "name": "getPrice",
        "outputs": [
            { "internalType": "uint256", "name": "value", "type": "uint256" },
            { "internalType": "uint64", "name": "timestamp", "type": "uint64" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Replace with actual feed IDs from Blocksense
export const FEED_ID_BTC = 1; // Example BTC/USD feed ID
export const FEED_ID_ETH = 2; // Example ETH/USD feed ID
export const FEED_ID_EUR = 3; // Example EUR/USD feed ID
