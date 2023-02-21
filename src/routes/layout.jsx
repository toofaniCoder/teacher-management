import { Container, CssBaseline, GlobalStyles, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const theme = useTheme();
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          img: {
            maxWidth: '100%',
          },
          body: {
            backgroundColor: theme.palette.grey[100],
          },
        }}
      />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
