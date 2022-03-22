import React from 'react';
import { Button } from '@mui/material';
import { useMetaMask } from '../../context/walletservice';

/**
 * Shows the connected wallet status
 * @returns 
 */
const WalletConnectButton: React.FunctionComponent = () => { 
    const { web3, state } = useMetaMask();
    let buttonMessage
    let icon;
    switch(state.state) {
        case "IDLE": {
            buttonMessage = "Connect Wallet";
            break;
        }
        case "CONNECTING": {
            buttonMessage = "Connecting...";
            break;
        }
        case "NOMETAMASK": { 
            buttonMessage = "No Meta Mask wallet";
            break;
        }
        case "ERROR": { 
            buttonMessage = "Unable to connect";
            break;
        }
        case "CONNECTED": { 
            buttonMessage = "Connected to Wallet";
            break;
        }
    }
    return <Button variant="outlined" color="secondary">{buttonMessage}</Button>
}

export default WalletConnectButton;
