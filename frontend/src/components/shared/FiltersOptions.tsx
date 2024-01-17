import { Box } from '@mui/material';
import AutocompleteIntroduction from './CustomAutoComplete';
const makeOtions = [
  { label: 'Mahindra XUV300' },
  { label: 'Toyota Fortuner' },
  { label: 'Mahindra Scorpio' },
];
const FilterOptions = () => {
  const handleSearchClick = () => {};
  return (
    <div className='h-12 max-sm:h-14 p-2 mt-2 bg-white shadow-sm grid grid-cols-5 auto-cols-auto	 gap-2 overflow-x-auto custom-scrollbar '>
      <AutocompleteIntroduction options={makeOtions} placeholder={'Make'} />
      <AutocompleteIntroduction options={[]} placeholder={'Model'} />
      <AutocompleteIntroduction options={[]} placeholder={'Variant'} />
      <AutocompleteIntroduction options={[]} placeholder={'Year'} />
      <div className='flex justify-center gap-3 min-w-min'>
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <div
            className='text-[12px] bg-yellow-400 px-5   py-1.5 cursor-pointer'
            onClick={handleSearchClick}
          >
            Go
          </div>
        </Box>
        <Box
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          <div
            className='text-[12px] bg-yellow-400 px-5 py-1.5 cursor-pointer min-w-28'
            onClick={handleSearchClick}
          >
            More Filters
          </div>
        </Box>
      </div>
    </div>
  );
};

export default FilterOptions;
