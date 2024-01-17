import { useEffect, useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/apiCalls';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  /**
   * handles the login request to the backend
   * @param {object} user - user object with email and password properties
   */

  const handleLogin = async () => {
    const response = await login(user);
    // @ts-ignore
    if (response.data.user) {
      // @ts-ignore
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } else {
      //@ts-ignore
      setError(response.data.message);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setError('');
  };

  useEffect(() => {
    let user = window.localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      //@ts-ignore
      if (user.user && user.token) {
        navigate('/dashboard');
      }
    }
  }, []);

  return (
    <div className='h-screen  bg-white shadow-sm grid grid-cols-6    '>
      <div className=' bg-green-400 col-span-4 max-sm:hidden'>
        <img src={`/login-bg.jpg`} className='h-screen w-full' />
      </div>
      <div className=' bg-blue-500 col-span-2 max-sm:col-span-6 flex flex-col justify-center items-center '>
        <div className='text-white text-xl  '>Hayundayi Safety Analytics</div>

        <div className='text-white text-[12px] mt-3'>Sign-in</div>

        <div className='mt-3  '>
          <div className='mt-2 relative flex bg-white  grow items-center gap-1   px-1'>
            <Person2OutlinedIcon sx={{ fontSize: 16 }} />
            <input
              className='py-1  text-[14px] outline-none shadow-none w-48'
              placeholder='User Id'
              name='email'
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className='mt-2 relative flex bg-white  grow items-center gap-1 px-1'>
            <LockOutlinedIcon sx={{ fontSize: 16 }} />
            <input
              className='py-1  text-[14px] outline-none shadow-none w-48 '
              placeholder='Password'
              type='password'
              name='password'
              value={user.password}
              onChange={handleChange}
            />
          </div>
          {error && (
            <div className='mt-2  text-[14px] text-red-600  w-48 '>{error}</div>
          )}
          <div
            className='mt-5 py-1 px-2  text-[14px]  font-bold text-center bg-yellow-400 w-full cursor-pointer '
            onClick={handleLogin}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
