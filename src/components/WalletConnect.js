// src/components/WalletConnect.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import Button from '@mui/material/Button';

const WalletConnect = ({ onWalletConnected }) => {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const userAccount = await signer.getAddress();
            setAccount(userAccount);
            onWalletConnected(provider); // Pass provider to parent for contract interaction
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <div>
            {account ? (
                <p>Connected: {account}</p>
            ) : (
                <Button variant="contained" onClick={connectWallet}>Connect Wallet</Button>
            )}
        </div>
    );
};

export default WalletConnect;
