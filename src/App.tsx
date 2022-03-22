import React, { useMemo } from 'react';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import ColorSwitcher    from "./context/colorswitcher";
import CssBaseline      from "@mui/material/CssBaseline";
import Container        from "@mui/material/Container";
import AppBar           from "./components/appbar";
import ContractServiceContext  from "./context/contractservice";
import WalletServiceProvider from "./context/walletservice";

import './App.css';
import { DEFAULT_ADDRESS } from './constants';
import GridContainer from './components/gridcontainer';
import SplashContent from './components/splashcontent';

/**
 * App container handles toggling light/dark mode
 */
const App: React.FunctionComponent = () => {

    /** 
    * ************************************************************************
    *  Handle toggling of dark mode and light mode
    * ************************************************************************
    */
    const [mode, setMode] = React.useState<"light" | "dark">("light");

    // use a memo to handle toggling, causing app to re render with new mode applied.
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        [],
    );

    // use memo so the theme does not switch back on re render
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        light: '#f2f3f7',
                        main: '#d8dde3',
                        dark: '#b29a91',
                        contrastText: '#1d1d1e',
                    },
                    secondary: {
                        light: '#f2f3f7',
                        main: '#b29a91',
                        dark: '#a07763',
                        contrastText: '#000',
                    },
                },
            }),
        [mode],
    );

    return (
        <ColorSwitcher.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xl">
                <CssBaseline />
                    <WalletServiceProvider>
                        <ContractServiceContext address={DEFAULT_ADDRESS}>
                            <AppBar />                            
                            <div className='main'>
                                <SplashContent/>
                                <GridContainer/>
                            </div>
                        </ContractServiceContext>
                    </WalletServiceProvider>
                </Container>
            </ThemeProvider>
        </ColorSwitcher.Provider>
     );
}
export default App;