import { debug } from 'console';
import React from 'react';
import { useContract } from '../../context/contractservice';
import Grid from '../grid';
import CircularProgress from '@mui/material/CircularProgress';


const GridContainer: React.FunctionComponent = () => { 
    
    const {indexes, loading} = useContract();
    console.log(loading);
    if(loading) {
        return  <div><CircularProgress sx={{margin:"auto"}}/></div>
    }

    return  <div><CircularProgress sx={{margin:"auto"}}/></div>
}

export default GridContainer;
