
import React from 'react';
import { useContract } from '../../context/contractservice';
import CircularProgress from '@mui/material/CircularProgress';
import { WrappedIndexes } from './interface';
import { wrapIndex } from './services';
import IndexBlock from '../indexblock';

const GridContainer: React.FunctionComponent = () => { 
    
    const {indexes, loading} = useContract();

    if(loading) {
        return  <div><CircularProgress className='fade-in' sx={{margin:"auto"}}/></div>
    }
    
    /**
     * reduce the array into an object that contains the title for each array
     */
    const wrappedIndexes = indexes.reduce<Array<WrappedIndexes>>(wrapIndex, []);

    return  <div className='fade-in'>{wrappedIndexes.map(IndexBlock)}</div>
}

export default GridContainer;
