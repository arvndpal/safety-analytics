import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validUser } from '../../utils';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    setError('');
  };
  const handleLogin = () => {
    const { username, password } = user;
    console.log('user', username, password);
    if (validUser.username === username && validUser.password === password) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };
  return (
    <div className='flex justify-between items-center w-full h-screen bg-blue-400 px-24 py-10'>
      <div className=' grid max-sm:grid-cols-1 grid-cols-2  w-full bg-white h-[475px] login-container'>
        <div className=' max-sm:hidden  '>
          <img
            className='h-full login-section1'
            src='/assets/images/login.png'
            alt='login image'
            height={'100%'}
            width={'100%'}
          />
        </div>
        <div className='flex flex-col p-5 bg-white login-section2 -ml-10 '>
          <div className='font-bold text-blue-950 text-[20px] mt-3'>Login</div>
          <div className='font-bold text-blue-900 text-[14px] mt-1'>
            Please login to continue
          </div>
          <div className='mt-16 mr-10'>
            <input
              className='p-1  text-[14px] outline-none shadow-none  border-blue-400 w-full input'
              placeholder='username'
              name='username'
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className='mr-10'>
            <input
              className='p-1 mt-2 text-[14px] outline-none shadow-none  border-blue-400 w-full input'
              placeholder='password'
              name='password'
              type='password'
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center justify-between mt-1 mr-10 font-bold  text-blue-900 text-[12px] '>
            <div className='flex '>
              <div>
                {' '}
                <input className='mt-0.5 mr-2' type='checkbox' />
              </div>{' '}
              Keep me looged in
            </div>
            <div>Forgot password?</div>
          </div>
          <div>
            {error && <div className='text-red-500 text-[12px]'>{error}</div>}
          </div>
          <div
            className='bg-blue-500 text-center text-white font-bold mr-10 mt-7 p-1.5 cursor-pointer'
            onClick={handleLogin}
          >
            Login
          </div>
          <div className='mt-5 text-center text-[14px] text-gray-500'>Or</div>
          <div className='mt-0.5 text-center text-[14px] text-gray-500'>
            Login with
          </div>
          <div className='flex gap-5 justify-center mt-5'>
            <img src='/assets/images/fb.png' height={32} width={32} alt='fb' />
            <img src='/assets/images/x.png' height={32} width={32} alt='x' />
            <div>
              <img
                src='/assets/images/google.png'
                height={20}
                width={28}
                alt='Google'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
