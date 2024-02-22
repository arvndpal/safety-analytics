import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectBox = ({ label, yearOptions = [] }) => {
  const [year, setYear] = React.useState(yearOptions[0]);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id='demo-simple-select-standard-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={year}
          onChange={handleChange}
          label='Year'
        >
          <MenuItem key='none' className='!text-[12px]' value=''>
            <em>None</em>
          </MenuItem>
          {yearOptions.map((year) => (
            <MenuItem key={year} className='!text-[12px]' value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectBox;
