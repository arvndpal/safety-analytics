import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateData } from '../../utils/apiCalls';
import { updateUserData } from '../../lib/features/userSlice';

type UserUpdateFormType = {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

const UserUpdateForm = ({
  user: userData,
  handleClose,
  handleOk,
}: {
  user: UserUpdateFormType;
  handleClose: any;
  handleOk: any;
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ ...userData, password: '' });

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  };
  const handleUpdate = () => {
    const data = {
      id: user.id,
      user: {
        ...user,
        firstName: user.first_name,
        lastName: user.last_name,
        companyName: user.company,
      },
    };
    // @ts-ignore
    dispatch(updateUserData(data));
  };
  return (
    <>
      <div className='grid  grid-cols-1 sm:grid-cols-2 gap-3'>
        <TextField
          error={false}
          id='filled-error'
          label='First Name'
          name='first_name'
          value={user.first_name}
          variant='filled'
          size='small'
          onChange={handleChange}
        />
        <TextField
          error={false}
          id='filled-error-helper-text'
          label='Last Name'
          name='last_name'
          value={user.last_name}
          helperText=''
          variant='filled'
          size='small'
          onChange={handleChange}
        />
        <div className='h-12 !text-[12px]'>
          <TextField
            error={false}
            id='filled-error-helper-text'
            label='Company Name'
            name='company'
            value={user.company}
            helperText=''
            variant='filled'
            size='small'
            onChange={handleChange}
          />
        </div>

        <div className='h-12 !text-[12px]'>
          <TextField
            error={false}
            id='filled-error-helper-text'
            label='Password'
            name='password'
            value={user.password}
            helperText=''
            variant='filled'
            size='small'
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='flex float-right mt-5'>
        <Button className=' bg-gray-500  !text-[12px] ' onClick={handleClose}>
          Cancel
        </Button>
        <Button className='text-blue-500  !text-[12px] ' onClick={handleUpdate}>
          Update
        </Button>
      </div>
    </>
  );
};

export default UserUpdateForm;
