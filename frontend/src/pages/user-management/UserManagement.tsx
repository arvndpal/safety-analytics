// @ts-nocheck
import { useState, useEffect } from 'react';
import SimpleAgGridTable from '../../components/shared/ag-grid-tables/SimpleAgGridTable';
import ActionRenderer from './ActionRenderer';
import { columns } from './tableHeads';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../lib/features/userSlice';
import CustomMenu from '../../components/shared/CustomMenu';
import moment from 'moment';
import { Box } from '@mui/material';

const UserManagement = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    setColDefs(columns);
    dispatch(getUserData());
  }, []);

  useEffect(() => {
    const data = userData.map((item) => {
      return {
        ...item,
        createdAt: moment(item.createdAt).format('MM/DD/YYYY'),
        updatedAt: moment(item.updatedAt).format('MM/DD/YYYY'),
      };
    });
    setRowData(data);
  }, [userData]);

  const frameworkComponents = {
    actionRenderer: ActionRenderer,
  };

  const handleDownloadAsClick = () => {};
  return (
    <>
      <div className='flex-between flex-col mt-2 sm:flex-row '>
        <div>
          <h1 className='my-2 font-bold'>User Management</h1>
        </div>
        <div className='mb-2 flex-between gap-2'>
          <Box
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            <div
              className='text-[12px] bg-yellow-400 px-4 py-1.5 cursor-pointer  '
              onClick={() => {}}
            >
              ADD NEW
            </div>
          </Box>
          <CustomMenu
            label={'Download Report as'}
            items={['Export as PDF', 'Export as Xlsx', 'Export as CSV']}
            handleMenuClick={handleDownloadAsClick}
          />{' '}
        </div>
      </div>

      <div className='ag-theme-quartz h-[450px] w-full custom-scrollbar'>
        <SimpleAgGridTable
          rowData={rowData}
          colDefs={colDefs}
          frameworkComponents={frameworkComponents}
        />
      </div>
    </>
  );
};

export default UserManagement;
