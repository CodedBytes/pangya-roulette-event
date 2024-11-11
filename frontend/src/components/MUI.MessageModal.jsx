/**
 * Design utilizando Material-UI
 * Material-UI é uma UI focada em experiência de usuário, com itens ja prontos para consumo.
 * 
 * Documentação : https://mui.com/material-ui/getting-started/
 */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MessageModal = ({msg, OpenModal, CloseModal, open, setOpen}) => {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={CloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Aviso
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {msg}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default MessageModal;