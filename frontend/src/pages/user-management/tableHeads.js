import ActionRenderer from './ActionRenderer';

export const columns = [
  { field: 'id', headerName: 'ID', minWidth: 60, maxWidth: 60 },
  { field: 'first_name', headerName: 'First Name', minWidth: 120 },
  { field: 'last_name', headerName: 'Last Name', minWidth: 100, maxWidth: 100 },
  { field: 'email', headerName: 'Email', minWidth: 150 },
  { field: 'company', headerName: 'Company', minWidth: 120 },
  { field: 'createdAt', headerName: 'Created At', minWidth: 120 },
  { field: 'updatedAt', headerName: 'Updated At', minWidth: 120 },
  {
    field: 'action',
    headerName: 'Action',
    minWidth: 80,
    pinned: 'right',
    cellRenderer: ActionRenderer,
  },
];
