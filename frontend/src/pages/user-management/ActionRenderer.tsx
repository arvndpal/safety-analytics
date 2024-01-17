import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import Tooltip from '@mui/material/Tooltip';
import ConfirmationModal from '../../components/shared/ConfirmationModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../lib/features/userSlice';
import UserUpdateForm from './UpdateForm';

const ActionRenderer = (props: any) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdatedModal] = useState(false);
  const openDeleteUserModal = () => {
    setOpenModal(true);
  };

  const editUser = () => {
    setOpenUpdatedModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOk = () => {
    // @ts-ignore
    dispatch(deleteUser(props.data.id));
    handleClose();
  };

  //Update user
  const handleUpdateClose = () => {
    setOpenUpdatedModal(false);
  };
  const handleUpdateOk = () => {
    // @ts-ignore
    // dispatch(updateUser(props.data));
    handleUpdateClose();
  };
  return (
    <div className='flex '>
      <div onClick={editUser}>
        <Tooltip title='Edit the Record' arrow>
          <DriveFileRenameOutlineOutlinedIcon className='text-blue-500 cursor-pointer' />
        </Tooltip>
      </div>{' '}
      <div onClick={openDeleteUserModal}>
        {'   '}
        <Tooltip title='Delete the record' arrow>
          <DeleteForeverOutlinedIcon className='ml-3 text-blue-500 cursor-pointer' />
        </Tooltip>
      </div>
      <ConfirmationModal
        openModal={openModal}
        title='Delete the User'
        message={
          <div className='text-[12px]'>
            Are you sure you want to delete the user with email{' '}
            <b>{props.data.email}</b>?
            <br />
            <i>This action can not be undone.</i>
          </div>
        }
        okButtonText='Yes, delete'
        cancelButtonText='Cancel'
        handleClose={handleClose}
        handleOk={handleOk}
      />
      <ConfirmationModal
        openModal={openUpdateModal}
        title={`Update ${props.data.email} User`}
        message={
          <UserUpdateForm
            user={props.data}
            handleClose={handleUpdateClose}
            handleOk={handleUpdateOk}
          />
        }
        okButtonText='Update'
        cancelButtonText='Cancel'
      />
    </div>
  );
};

export default ActionRenderer;
