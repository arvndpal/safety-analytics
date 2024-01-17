import { useSelector } from 'react-redux';
import LeftSidebar from './LeftSidebar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MobileNavbar from './MobileNavbar';

const NavbarSisdebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { sidebar } = useSelector((state: any) => state.toggle);

  useEffect(() => {
    let user = window.localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      //@ts-ignore
      if (!(user.user && user.token)) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, []);

  return (
    <main className='relative '>
      <Navbar />

      <MobileNavbar />

      <div className='flex'>
        <section
          className={`max-sm:hidden bg-blue-500 custom-scrollbar light-border absolute left-0 top-0 flex h-full flex-col  overflow-y-auto border-r   pt-[58px] ${
            sidebar ? 'w-[266px] max-sm:w-[0px]' : 'w-[0px]'
          }`}
        >
          <LeftSidebar />
        </section>
        <section className='bg-gray-200 flex min-h-screen flex-1 flex-col px-6 pb-14  pt-[58px]  '>
          <div
            className={`${
              sidebar
                ? 'max-sm:ml-[0px] max-sm:w-[100%] ml-[266px] w-[100%-266px]'
                : 'ml-[0px] w-[100%]'
            } `}
          >
            {children}
          </div>
        </section>
      </div>

      <div className='bg-white text-gray-700 h-16 shadow-lg text-[12px]  font-bold flex justify-end items-center'>
        © All Right Reserved
      </div>
    </main>
  );
};

export default NavbarSisdebarWrapper;
