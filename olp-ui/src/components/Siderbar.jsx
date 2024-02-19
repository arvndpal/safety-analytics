import { Link, useLocation } from 'react-router-dom';
import { sidbarlinks } from '../utils';

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className='py-10 px-5'>
      {sidbarlinks.map((link) => {
        let isActive = pathname === link.route;
        console.log('isActive: ', isActive, pathname, link.route);
        return (
          <Link
            to={link.route}
            key={link.route}
            className={`flex  mt-5   px-3 py-2 rounded-sm ${
              isActive ? 'bg-teal-500  text-white' : ' '
            }  text-[12px] hover:bg-teal-200 flex-between`}
          >
            <div className='mr-2 w-4 mt-[3px]'>
              <i
                className={`${link.icon}  text-[13px]  ${
                  isActive ? ' text-white' : ' '
                }`}
                aria-hidden='true'
              ></i>
            </div>
            <div className='text-[14px] max-sm:hidden'>{link.name}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default Sidebar;
