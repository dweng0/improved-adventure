import { Box } from '@mui/material';
import BigNumber from 'bignumber.js';
import React from 'react';
import { CENT_DECIMAL_PLACES, WEI_DECIMAL_PLACES } from '../../constants';
import { IndexPoint } from '../../context/contractservice/interface';

const IndexDetail: React.FunctionComponent<IndexPoint> = ({name, percentageChange, usdCapitalization, ethPriceInWei, usdPriceInCents}) => {

    const ethereum      = new BigNumber(ethPriceInWei).shiftedBy(WEI_DECIMAL_PLACES).toFormat(2);
    const dollar        = new BigNumber(usdPriceInCents).shiftedBy(CENT_DECIMAL_PLACES).toFormat(2);
    const marketCap     = new BigNumber(usdCapitalization).toFormat(2);
    const priceDelta    = new BigNumber(percentageChange);
    const isLong        = (priceDelta.gt(0));

    return (
        <Box key={name} className='index-block'>
            <div>
                <div>
                    <span className='index-block-title'>{name}</span>
                </div>
                <div>
                    <span className='pricing' >${dollar}/{ethereum}ETH</span>
                </div>
            </div>
            <div>
                <span>${marketCap}</span>
                <span style={{color: (isLong) ? "#22d4af" : "#fd0d73"}}> {isLong ? "+" : ""}{priceDelta.toFormat(2)}%</span>
            </div>
        </Box>   
    )
    
}

export default IndexDetail