import { Box } from '@mui/material';
import React from 'react';
import { IndexPoint } from '../../context/contractservice/interface';
import { asBigNumber, formatMarketCap, getDollarsFromCents, getEthFromWei, isLong } from './services';

const IndexDetail: React.FunctionComponent<IndexPoint> = ({name, percentageChange, usdCapitalization, ethPriceInWei, usdPriceInCents}) => {

    const ethereum      = getEthFromWei(ethPriceInWei);
    const dollars       = getDollarsFromCents(usdPriceInCents);
    const marketCap     = formatMarketCap(usdCapitalization);
    const priceDelta    = asBigNumber(percentageChange);
    const long          = isLong(priceDelta);

    return (
        <Box key={name} className='index-block'>
            <div>
                <div>
                    <span className='index-block-title'>{name}</span>
                </div>
                <div>
                    <span className='pricing' >${dollars}/{ethereum}ETH</span>
                </div>
            </div>
            <div>
                <span>${marketCap}</span>
                <span style={{color: (long) ? "#22d4af" : "#fd0d73"}}> {long ? "+" : ""}{priceDelta.toFormat(2)}%</span>
            </div>
        </Box>   
    )
    
}

export default IndexDetail