import React from "react";
import Box from "@mui/material/Box";
import { toggleWrapper, logoStyle, walletWrapper } from "./style";
import ThemeToggle from "../themetoggle";
import { Button } from '@mui/material';
import WalletConnectButton from "../walletstatus";

/**
 * Nav bar component
 * {@see ThemeToggle }
 * {@see StatusBar }
 */
const NavBar: React.FunctionComponent = () => {
    return (
        <Box>
            <Button sx={logoStyle} color="secondary">Logotype</Button>   
            <Box sx={walletWrapper}>
                <WalletConnectButton/>
            </Box>
            <Box sx={toggleWrapper}>
                <ThemeToggle/>
            </Box>
        </Box>
        
    )
}
export default NavBar;