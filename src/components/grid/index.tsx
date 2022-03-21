import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, GridProps } from './interface';

const Grid: React.FunctionComponent<GridProps> = ({rows}) => { 
    return (
        <div style={{ height: 400, width: '100%', paddingTop: '125px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      );
}
export default Grid;