import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

type ConfirmationModalType = {
  openModal: boolean;
  title: string;
  message: any;
  okButtonText: string;
  cancelButtonText: string;
  handleClose?: any;
  handleOk?: any;
};

export default function ConfirmationModal({
  openModal,
  title = '',
  message = '',
  okButtonText = 'OK',
  cancelButtonText = 'Cancel',
  handleClose,
  handleOk,
}: ConfirmationModalType) {
  const [open, setOpen] = React.useState(openModal);

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle className='text-blue-500 !text-[14px]'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        {handleClose && handleOk && (
          <DialogActions className='h-10'>
            <Button
              className=' bg-gray-500  !text-[12px] '
              onClick={handleClose}
            >
              {cancelButtonText}
            </Button>
            <Button className='text-blue-500  !text-[12px] ' onClick={handleOk}>
              {okButtonText}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
