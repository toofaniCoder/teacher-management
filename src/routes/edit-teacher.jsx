import { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Form,
  useNavigate,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';

export const loader = async ({ params }) => {
  const res = await axios.get(`/api/teachers/${params.id}?populate=*`);
  return res.data.data;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const { profile, ...data } = Object.fromEntries(formData);

  const newStudent = new FormData();
  newStudent.append('data', JSON.stringify(data));
  if (profile.size !== 0) newStudent.append('files.profile', profile);
  await axios.put(`/api/teachers/${params.id}`, newStudent);
  return redirect('..');
};

const EditTeacher = () => {
  const teacher = useLoaderData();
  const { firstName, lastName, email, address, phone, subject, profile } =
    teacher.attributes;
  const [profileName, setProfileName] = useState(null);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isUpdating = navigation.state !== 'idle';
  const handleClose = () => {
    navigate(-1);
  };
  return (
    <Dialog
      component={Form}
      replace
      method="post"
      encType="multipart/form-data"
      sx={{ backdropFilter: 'blur(15px)' }}
      open={true}
      onClose={handleClose}
    >
      <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Edit Teacher Profile</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          disabled={isUpdating}
          label="first name"
          placeholder="Enter Your First Name"
          margin="dense"
          name="firstName"
          defaultValue={firstName}
          fullWidth
        />
        <TextField
          disabled={isUpdating}
          label="last name"
          placeholder="Enter Your Last Name"
          margin="dense"
          name="lastName"
          defaultValue={lastName}
          fullWidth
        />
        <TextField
          disabled={isUpdating}
          label="E-mail"
          placeholder="Enter Your E-mail Address"
          margin="dense"
          name="email"
          defaultValue={email}
          fullWidth
        />
        <TextField
          disabled={isUpdating}
          label="subject"
          placeholder="Enter Your Subject Name"
          margin="dense"
          name="subject"
          defaultValue={subject}
          fullWidth
        />
        <TextField
          disabled={isUpdating}
          label="address"
          placeholder="Enter Your Full Address"
          margin="dense"
          name="address"
          defaultValue={address}
          fullWidth
        />
        <TextField
          disabled={isUpdating}
          label="phone"
          placeholder="Enter Your Phone Number"
          margin="dense"
          name="phone"
          defaultValue={phone}
          fullWidth
        />

        <Stack spacing={1}>
          <Button
            disabled={isUpdating}
            variant="outlined"
            fullWidth
            size="large"
            component="label"
          >
            Update your profile picture
            <input
              onChange={(e) => setProfileName(e.target.files[0].name)}
              name="profile"
              hidden
              accept="image/*"
              type="file"
            />
          </Button>
          {profile.data && (
            <Chip
              color="success"
              size="large"
              variant="outlined"
              label={profileName ?? profile.data.attributes.name}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isUpdating} color="inherit" onClick={handleClose}>
          Close
        </Button>
        <LoadingButton
          loading={isUpdating}
          disabled={isUpdating}
          type="submit"
          variant="contained"
          color="primary"
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeacher;
