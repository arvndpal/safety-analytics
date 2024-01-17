import MenuIcon from '@mui/icons-material/Menu';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../lib/features/toggleSlice';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    let user = window.localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      //@ts-ignore
      setUser(user);
    }
  }, []);
  const handleSidbarToggle = () => {
    dispatch(toggleSidebar());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleMenuClick = (item: any) => {
  //   console.log(item);
  // };
  return (
    <div>
      <nav className='flex-between bg-white shadow-lg fixed z-50 w-full gap-5 px-4  py-3  '>
        <div className='cursor-pointer flex '>
          <span onClick={handleSidbarToggle}>
            {' '}
            <MenuIcon className='text-blue-500' />
          </span>
          <div className=' ml-3 text-blue-900 font-bold'>Safety Analytics</div>
        </div>
        <div className='flex-between '>
          <div>
            <CircleNotificationsIcon />
          </div>
          <div className='mr-3'>
            <div onClick={handleClick}>
              {' '}
              {/* <AccountCircleOutlinedIcon /> */}
              <Tooltip title='Account settings'>
                <IconButton
                  onClick={handleClick}
                  size='small'
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 22, height: 22 }}>
                    <div className='text-[14px]'>
                      {' '}
                      {
                        //@ts-ignore
                        user?.user?.name?.charAt(0)
                      }
                    </div>
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>

            {/* {
              //@ts-ignore
              <div onClick={handleClick}>{user?.user?.name}</div>
            } */}
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                className='px-2  h-6 min-w-32 !text-[14px] !text-blue-500'
                onClick={handleClose}
              >
                {
                  // @ts-ignore
                  user?.user?.name
                }
              </MenuItem>
              <MenuItem
                className='px-2  -mt-2 h-6 min-w-32 !text-[12px] !text-blue-500'
                onClick={handleClose}
              >
                {
                  // @ts-ignore
                  user?.user?.email
                }
              </MenuItem>
              <Divider />
              <MenuItem
                className='px-2  h-6 min-w-32 !text-[12px]'
                onClick={handleClose}
              >
                <ListItemIcon>
                  <PersonAdd fontSize='small' />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem
                className='px-2  h-6 min-w-32 !text-[12px]'
                onClick={handleClose}
              >
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem
                className='px-2  h-6 min-w-32 !text-[12px]'
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
              >
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
