// src/components/PriceDisplay.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ORACLE_CONTRACT_ADDRESS, ORACLE_ABI, FEED_ID_BTC, FEED_ID_ETH, FEED_ID_EUR } from '../config';
import Typography from '@mui/material/Typography';

const PriceDisplay = ({ provider }) => {
    const [prices, setPrices] = useState({ btc: null, eth: null, eur: null });
    const [timestamp, setTimestamp] = useState(null);

    useEffect(() => {
        if (provider) {
            const fetchPrices = async () => {
                const contract = new ethers.Contract(ORACLE_CONTRACT_ADDRESS, ORACLE_ABI, provider);

                // Retrieve data for each feed
                const btcData = await contract.getPrice(FEED_ID_BTC);
                const ethData = await contract.getPrice(FEED_ID_ETH);
                const eurData = await contract.getPrice(FEED_ID_EUR);

                // Format values for display
                setPrices({
                    btc: ethers.utils.formatUnits(btcData[0], 18), // Assuming 18 decimals
                    eth: ethers.utils.formatUnits(ethData[0], 18),
                    eur: ethers.utils.formatUnits(eurData[0], 18),
                });
                setTimestamp(new Date(btcData[1] * 1000).toLocaleString()); // Convert timestamp to readable format
            };

            fetchPrices();
        }
    }, [provider]);

    return (
        <div>
            <Typography variant="h5">BTC/USD: ${prices.btc}</Typography>
            <Typography variant="h5">ETH/USD: ${prices.eth}</Typography>
            <Typography variant="h5">EUR/USD: ${prices.eur}</Typography>
            <Typography variant="caption">Updated: {timestamp}</Typography>
        </div>
    );
};

export default PriceDisplay;
