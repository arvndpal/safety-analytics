import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import { informations } from '../../utils';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const DashboardContent = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='p-5'>
      <Header />
      <div className='grid max-sm:grid-cols-2 grid-cols-4 mt-5 gap-5'>
        {informations.map((info) => {
          return (
            <InfoCard
              key={info.name}
              name={info.name}
              value={info.value}
              icon={info.icon}
              color={info.color}
            />
          );
        })}
      </div>
      <div className='mt-10' id='tabs-container '>
        <Box
          className='bg-white min-h-80'
          sx={{ width: '100%', typography: 'body1' }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab className='!capitalize' label='My Info' value='1' />
                <Tab className='!capitalize' label='School Info' value='2' />
                <Tab className='!capitalize' label='Contact Info' value='3' />
                <Tab
                  className='!capitalize'
                  label='Course Registration'
                  value='4'
                />
              </TabList>
            </Box>
            <TabPanel value='1'>My Information</TabPanel>
            <TabPanel value='2'>School Information</TabPanel>
            <TabPanel value='3'>
              <div className='flex justify-center items-center flex-col'>
                <div className='text-[12px]'>No Records Found</div>
                <div className='mt-2 text-[14px] py-2 px-2 bg-teal-600 text-white w-72 text-center'>
                  Add New Contact Information
                </div>
              </div>
            </TabPanel>
            <TabPanel value='4'>course Registration</TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default DashboardContent;
