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
import { Link, useNavigate, useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
  const res = await axios.get(`/api/teachers/${params.id}?populate=*`);
  return res.data.data;
};

const ViewTeacher = () => {
  const navigate = useNavigate();
  const teacher = useLoaderData();
  const { firstName, lastName, email, address, phone, subject, profile } =
    teacher.attributes;
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Dialog
      sx={{ backdropFilter: 'blur(15px)' }}
      open={true}
      onClose={handleClose}
    >
      <DialogTitle sx={{ borderBottom: 1, mb: 3, borderColor: 'divider' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">View Teacher Profile</Typography>
          <IconButton
            replace
            component={Link}
            to="../edit"
            relative="path"
            color="secondary"
          >
            <EditTwoToneIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <img
          src={
            profile.data
              ? `${axios.defaults.baseURL}${profile.data.attributes.url}`
              : `https://via.placeholder.com/800x600/333/fff`
          }
        />
        <Typography variant="h4" textTransform="capitalize">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body1" textTransform="capitalize" gutterBottom>
          {subject} teacher
        </Typography>
        <Typography variant="body2">{email}</Typography>
        <Typography variant="body2">{address}</Typography>
        <Typography variant="body2">{phone}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          replace
          component={Link}
          to="../delete"
          relative="path"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTeacher;
