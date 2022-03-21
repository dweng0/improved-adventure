export interface ContractProps { 
   address: string
}

// from a getGroup call
export interface IndexGroup {
    indexes: Array<string>
    name: string
}

// from getIndex
export interface IndexPoint {
    ethPriceInWei: string
    name: string
    percentageChange: string
    usdCapitalization: string
    usdPriceInCents: string
}

export interface ContractDetails {
    loading: boolean 
    error?: string,
    indexes: Array<IndexPoint>
}
