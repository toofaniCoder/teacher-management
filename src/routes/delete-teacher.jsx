import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Form,
  useNavigate,
  useLoaderData,
  redirect,
  useNavigation,
} from 'react-router-dom';
import { DialogContentText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export const action = async ({ params }) => {
  await axios.delete(`/api/teachers/${params.id}`);
  return redirect('..');
};

const DeleteTeacher = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isDeleting = navigation.state !== 'idle';
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Dialog replace component={Form} method="post" onClose={handleClose} open>
      <DialogContent>
        <DialogContentText>Aare you sure want to delete?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isDeleting} onClick={handleClose}>
          Close
        </Button>
        <LoadingButton
          disabled={isDeleting}
          loading={isDeleting}
          type="submit"
          variant="contained"
          color="error"
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTeacher;
