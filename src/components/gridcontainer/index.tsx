import { debug } from 'console';
import React from 'react';
import { useContract } from '../../context/contractservice';
import Grid from '../grid';


const GridContainer: React.FunctionComponent = () => { 
    
    const {indexes, loading, web3} = useContract();

    console.log(indexes);
    console.log(loading);
    return <p>hi</p>
}

export default GridContainer;
