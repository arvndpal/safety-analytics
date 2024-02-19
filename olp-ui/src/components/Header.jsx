import SelectBox from './SelectBox';

const Header = () => {
  return (
    <div className=' flex justify-between items-center  mt-2   '>
      <div>
        <h1 className='my-2 max-sm:hidden text-gray-800 text-[14px]'>
          Welcome
        </h1>
      </div>
      <div className=' flex justify-between gap-5 mr-10'>
        <div>
          <SelectBox
            label={'School year'}
            yearOptions={[2024, 2023, 2022, 2021]}
          />
        </div>
        <div className='mt-7'>
          <i className='fa fa-bell' aria-hidden='true'></i>
        </div>
        <div className='mt-7'>
          <i className='fa fa-user' aria-hidden='true'></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
