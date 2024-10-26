import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CircularProgress, Tooltip, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import 'chart.js/auto';
import Web3 from 'web3';
import './App.css';

const App = () => {
    const [btcPrice, setBtcPrice] = useState(null);
    const [ethPrice, setEthPrice] = useState(null);
    const [eurPrice, setEurPrice] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [prevPrices, setPrevPrices] = useState({ btc: null, eth: null, eur: null });
    const [walletAddress, setWalletAddress] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const btcResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                const ethResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                const eurResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');

                setPrevPrices({ btc: btcPrice, eth: ethPrice, eur: eurPrice });

                setBtcPrice(btcResponse.data.bitcoin.usd);
                setEthPrice(ethResponse.data.ethereum.usd);
                setEurPrice(eurResponse.data.rates.EUR);

                // Simulate adding to price history for demonstration
                setPriceHistory(prevHistory => [
                    ...prevHistory,
                    { time: new Date().toLocaleTimeString(), btc: btcResponse.data.bitcoin.usd, eth: ethResponse.data.ethereum.usd, eur: eurResponse.data.rates.EUR }
                ]);
            } catch (error) {
                console.error("Error fetching prices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000); // Update prices every 10 seconds

        return () => clearInterval(interval);
    }, [btcPrice, ethPrice, eurPrice]);

    const getColor = (newPrice, oldPrice) => {
        if (newPrice === oldPrice || oldPrice === null) {
            return 'black';
        }
        return newPrice > oldPrice ? 'green' : 'red';
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    const data = {
        labels: priceHistory.map(point => point.time),
        datasets: [
            {
                label: 'BTC/USD',
                data: priceHistory.map(point => point.btc),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
            },
            {
                label: 'ETH/USD',
                data: priceHistory.map(point => point.eth),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
            },
            {
                label: 'EUR/USD',
                data: priceHistory.map(point => point.eur),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
                Blocksense Oracle Data
            </Typography>

            {loading ? (
                <CircularProgress style={{ display: 'block', margin: 'auto' }} />
            ) : (
                <div>
                    <Card variant="outlined" style={{ marginBottom: '2rem' }}>
                        <CardContent>
                            <Tooltip title="Bitcoin Price in USD">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Typography variant="h5" style={{ color: getColor(btcPrice, prevPrices.btc) }}>
                                        BTC/USD Price: ${btcPrice}
                                    </Typography>
                                </motion.div>
                            </Tooltip>
                            <Tooltip title="Ethereum Price in USD">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Typography variant="h5" style={{ color: getColor(ethPrice, prevPrices.eth) }}>
                                        ETH/USD Price: ${ethPrice}
                                    </Typography>
                                </motion.div>
                            </Tooltip>
                            <Tooltip title="Euro Price in USD">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Typography variant="h5" style={{ color: getColor(eurPrice, prevPrices.eur) }}>
                                        EUR/USD Price: ${eurPrice}
                                    </Typography>
                                </motion.div>
                            </Tooltip>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Price Trends
                            </Typography>
                            <Line data={data} />
                        </CardContent>
                    </Card>
                </div>
            )}

            <Button variant="contained" onClick={connectWallet} className="MuiButton-contained">
                Connect Wallet
            </Button>
            {walletAddress && (
                <Typography variant="body1" className="wallet-address">
                    Connected Wallet: {walletAddress}
                </Typography>
            )}
        </Container>
    );
};

export default App;
