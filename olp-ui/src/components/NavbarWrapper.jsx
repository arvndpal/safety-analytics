import Sidebar from './Siderbar';

const NavbarWrapper = ({ children }) => {
  return (
    <div className='grid grid-cols-12 bg-gray-100'>
      <div className='col-span-2 bg-white shadow-lg h-screen'>
        <Sidebar />
      </div>
      <div className='col-span-10'>{children}</div>
    </div>
  );
};

export default NavbarWrapper;
