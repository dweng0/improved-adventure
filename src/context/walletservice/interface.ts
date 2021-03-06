import Web3 from "web3";

export interface Web3Context { 
    state: ConnectionState
    web3: Web3 | null
}

export interface ConnectionState { 
    state: "CONNECTED" | "CONNECTING" | "ERROR" | "NOMETAMASK" | "IDLE",
    message?: string
}