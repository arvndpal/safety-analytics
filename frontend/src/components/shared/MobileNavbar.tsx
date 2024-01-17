import * as React from 'react';
import Drawer from '@mui/material/Drawer';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../lib/features/toggleSlice';
import LeftSidebar from './LeftSidebar';

export default function MobileNavbar() {
  const dispatch = useDispatch();
  const { sidebar } = useSelector((state: any) => state.toggle);

  const [state, setState] = React.useState({
    left: sidebar,
  });
  React.useEffect(() => {
    setState({
      left: !sidebar,
    });
  }, [sidebar]);

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      dispatch(toggleSidebar());
    };

  return (
    <div>
      <Drawer
        className='sm:hidden'
        anchor={'left'}
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        <div className='w-[266px] bg-blue-500 h-full  '>
          <div className='cursor-pointer flex shadow-lg bg-white py-4'>
            {/* <span onClick={handleSidbarToggle}>
            {' '}
             <MenuIcon className='text-blue-500' />
          </span> */}
            <div className=' ml-5 text-blue-900 font-bold'>
              Safety Analytics
            </div>
          </div>
          <LeftSidebar />
        </div>
      </Drawer>
    </div>
  );
}
