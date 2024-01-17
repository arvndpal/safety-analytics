import { Box } from '@mui/material';
import FilterOptions from '../../components/shared/FiltersOptions';
import CustomMenu from '../../components/shared/CustomMenu';
import SearchIcon from '@mui/icons-material/Search';
import RecallsReported from './charts/RecallsReported';
import ProductQualityRatingScore from './charts/ProductQualityRatingScore';
import Sales from './charts/Sales';
import SalesPredictions from './charts/SalesPrediction';
const CompetitiveAnalysis = () => {
  const handleSearchClick = () => {};
  const handleDownloadAsClick = () => {};
  return (
    <>
      <div className='flex-between flex-col mt-2 sm:flex-row '>
        <div>
          <h1 className='my-2 font-bold'>Competitive Analysis</h1>
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
              label={'Download Report as'}
              items={['Export as PDF', 'Export as Xlsx', 'Export as CSV']}
              handleMenuClick={handleDownloadAsClick}
            />{' '}
          </div>
        </div>
      </div>
      <FilterOptions />
      <div className=' mt-2   shadow-sm grid    grid-cols-1 sm:grid-cols-8 gap-2 '>
        <div className='sm:col-span-2 col-span-1'>
          <RecallsReported />
        </div>
        <div className='sm:col-span-3 col-span-1'>
          <ProductQualityRatingScore />
        </div>
        <div className='sm:col-span-3 col-span-1'>
          <Sales />
        </div>
        <div className='sm:col-span-8 col-span-1'>
          <SalesPredictions />
        </div>
      </div>
    </>
  );
};

export default CompetitiveAnalysis;
