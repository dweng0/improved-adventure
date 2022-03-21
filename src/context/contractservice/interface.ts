import { Web3Context } from "../webthreeservice/interface";

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

export interface ContractDetails extends Partial<Web3Context> {
    indexes: Array<IndexPoint>,
    loading: boolean
}
