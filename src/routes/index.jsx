import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import classroom from '../assets/classroom.svg';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img src={classroom} alt="classroom photo" style={{ height: '80vh' }} />
      <Button
        component={Link}
        to="teachers"
        variant="contained"
        sx={{ alignSelf: 'center' }}
      >
        Teacher's Dashboard
      </Button>
    </Box>
  );
};

export default Index;
