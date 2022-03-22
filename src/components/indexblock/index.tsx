import React from 'react';
import { WrappedIndexes } from '../gridcontainer/interface';
import IndexDetail from '../indexdetail';

const IndexBlock: React.FunctionComponent<WrappedIndexes> = ({name, indexes}) => {
    return (
        <div key={name}>
            <h3 style={{textAlign: 'left'}}>{name}</h3>
            <div className='index-block-container'>
                {indexes.map(IndexDetail)}
            </div>
        </div>
    )
}

export default IndexBlock;