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