import { GridColDef } from "@mui/x-data-grid";
import { IndexPoint } from "../../interfaces";

export interface GridProps { 
    rows: Array<IndexPoint>
}

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150
    },
    {
      field: 'etchPriceInWei',
      headerName: 'ethereum',
      type: 'number',
      width: 150
    },
    {
      field: 'usdPriceInCents',
      headerName: 'us dollar',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'usdCapitalization',
      headerName: 'Market Cap',
      type: 'number',
      width: 160,
    },
    {
      field: 'percentageChange',
      headerName: 'Market Cap',
      type: 'number',
      width: 160,
    }
  ];