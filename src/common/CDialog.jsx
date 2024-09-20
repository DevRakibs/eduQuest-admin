/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grow, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});


export default function CDialog({ open, onClose, children, maxWidth, fullScreen }) {

  return (
    <Dialog
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullWidth
      onClose={onClose}
      open={open}
    >
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}