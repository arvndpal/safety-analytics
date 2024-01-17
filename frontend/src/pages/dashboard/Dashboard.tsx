'use client';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KPI from '../../components/shared/KPI';
import DealerWiseClaims from './charts/DealerWiseClaims';
import ViolationCategoriesCount from './charts/ViolationCategoriesCount';
import ModalWiseClaims from './charts/ModalWiseClaims';
import CustomMenu from '../../components/shared/CustomMenu';
import ViolationTrend from './charts/ViolationTrend';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getKPIsFirstList,
  getKPIsSecondList,
} from '../../lib/features/kpiSlice';
import { formatNumber } from '../../utils/utilitiesFunc';
import FilterOptions from '../../components/shared/FiltersOptions';

const Dashboard = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { secondKPIs, firstKPIs } = useSelector((state) => state.kpi);

  const handleSearchClick = () => {};
  const handleActionClick = (item: String) => {
    console.log('a', item);
  };
  const handleDownloadAsClick = (item: String) => {
    console.log('d', item);
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getKPIsFirstList());
    // @ts-ignore
    dispatch(getKPIsSecondList());
  }, []);

  return (
    <>
      <div className='flex-between flex-col mt-2 sm:flex-row '>
        <div>
          <h1 className='my-2 font-bold'>Dashboard</h1>
        </div>
        <div className='flex-between gap-5'>
          <Box
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            <div
              className='text-[12px] bg-gray-300 pl-2 pr-1 py-1.5 cursor-pointer'
              onClick={handleSearchClick}
            >
              Search <SearchIcon sx={{ fontSize: 16 }} />
            </div>
          </Box>
          <div>
            <CustomMenu
              label={'Actions'}
              items={['Profile', 'Delegate', 'Notify']}
              handleMenuClick={handleActionClick}
            />{' '}
          </div>
          <div>
            <CustomMenu
              label={'Download Report as'}
              items={['Export as PDF', 'Export as Xlsx', 'Export as CSV']}
              handleMenuClick={handleDownloadAsClick}
            />{' '}
          </div>
        </div>
      </div>
      <FilterOptions />
      <div className=' h-[66px]  p-2 mt-2 bg-white shadow-sm grid grid-cols-1 sm:grid-cols-6   gap-4 divide-x  divide-gray-300  overflow-x-auto custom-scrollbar '>
        {firstKPIs.map((item: any) => {
          const { label, kpi, yoy, qoq, isQoqUp, isYoyUp } = item;

          return (
            <KPI
              label={label}
              kpi={formatNumber(parseFloat(kpi))}
              yoy={yoy}
              qoq={qoq}
              isYoyUp={isYoyUp}
              isQoqUp={isQoqUp}
            />
          );
        })}
      </div>
      <div className=' h-[66px] p-2 mt-2 bg-white shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3 divide-x divide-gray-300  overflow-x-auto custom-scrollbar'>
        {secondKPIs.map((item: any) => {
          const { label, kpi, yoy, qoq, isQoqUp, isYoyUp } = item;

          return (
            <KPI
              label={label}
              kpi={kpi}
              yoy={yoy}
              qoq={qoq}
              isYoyUp={isYoyUp}
              isQoqUp={isQoqUp}
            />
          );
        })}
      </div>
      <div className=' mt-2   shadow-sm grid    grid-cols-1 sm:grid-cols-8 gap-2 '>
        <div className='sm:col-span-4 col-span-8'>
          <DealerWiseClaims />
        </div>
        <div className='sm:col-span-2 col-span-8'>
          <ViolationCategoriesCount />
        </div>
        <div className='sm:col-span-2 col-span-8'>
          <ModalWiseClaims />
        </div>
        <div className='  col-span-8'>
          <ViolationTrend />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
