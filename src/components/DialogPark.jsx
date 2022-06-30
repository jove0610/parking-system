import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    // eslint-disable-next-line
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

function DialogPark({ setOpen, data }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open
      >
        <Box width="30em" maxWidth="90vw">
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Welcome...
          </BootstrapDialogTitle>

          <DialogContent dividers>
            <Stack spacing="2em">
              <Typography gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Parking No: &nbsp;</span>
                {data.id}
              </Typography>
              <Typography gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Start: &nbsp;</span>
                {dayjs(data.startTime).format('MMM D, h:mm:ss A')}
              </Typography>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" autoFocus onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </div>
  );
}

DialogPark.propTypes = {
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startTime: PropTypes.string.isRequired,
  }).isRequired,
};

export default DialogPark;
