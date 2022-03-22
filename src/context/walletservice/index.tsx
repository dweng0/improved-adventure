import { MetaMaskInpageProvider } from "@metamask/providers";
import React, { createContext, useState, useEffect, useRef, useContext } from "react";
import Web3 from "web3";
import { AbstractProvider } from 'web3-core/types';
import { RPC_REQUEST_METHOD } from "../../constants";
import { ConnectionState, Web3Context } from "./interface";

const WebServiceContext = createContext<Web3Context | undefined>(undefined);

/**
 * HOC that handles connecting to web3, 
 * IT: provides state for the connection
 * Add different ways to connect to web3 here
 */
const WalletServiceProvider: React.FunctionComponent = ({children}) => { 
    
    // setup state
    const [web3Status, setWeb3Status] = useState<ConnectionState>({state: "IDLE"});
    const web3 = useRef<Web3 | null>(null);
  
    /**
    * IT: sets up a connection via web3
    * WHEN: the address changes
    */
     useEffect(() => { 
        const provider = (window.ethereum) as MetaMaskInpageProvider;
        if(typeof provider !== undefined) { 
            setWeb3Status({state: "CONNECTING"});
            provider.request({method: RPC_REQUEST_METHOD})
                .catch(message => setWeb3Status({state: "ERROR", message}))
                .finally(() => { 
                    web3.current = new Web3(provider as AbstractProvider);
                    setWeb3Status({state: "CONNECTED"});
                });
        } else {
            setWeb3Status({state: "NOMETAMASK"});
        }
    }, []);

    // provide to context
    const value: Web3Context = { 
        web3: web3.current,
        state: web3Status
    }

    return (
        <WebServiceContext.Provider value={value}> 
            {children}
        </WebServiceContext.Provider>
    )
}

/**
 * A consumer hook exposes the metamask context at any layer of component depth provided they are wrapped in a provider(IOC)
 * ContractServiceContext is not exported -on purpose- to control its usage.
 */
export const useMetaMask = (): Web3Context => { 
    const serviceContext = useContext(WebServiceContext);
    if(serviceContext === undefined) { 
        throw new Error("Please use in conjunction with a context provider")
    }
    return serviceContext;
}
export default WalletServiceProvider