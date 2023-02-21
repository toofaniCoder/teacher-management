import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, deepOrange } from '@mui/material/colors';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

/* import Roboto Font */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* import routes */
import Home from './routes';
import Layout from './routes/layout';
import Teachers, { loader as TeachersLoader } from './routes/teachers';
import ViewTeacher, { loader as ViewTeacherLoder } from './routes/view-teacher';
import CreateTeacher, {
  action as CreateTeacherAction,
} from './routes/create-teacher';
import EditTeacher, {
  loader as EditTeacherLoader,
  action as EditTeacherAction,
} from './routes/edit-teacher';
import DeleteTeacher, {
  action as DeleteTeacherAction,
} from './routes/delete-teacher';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: deepOrange,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'teachers',
        element: <Teachers />,
        loader: TeachersLoader,
        children: [
          {
            path: 'create',
            element: <CreateTeacher />,
            action: CreateTeacherAction,
          },
          {
            path: ':id/view',
            element: <ViewTeacher />,
            loader: ViewTeacherLoder,
          },

          {
            path: ':id/edit',
            element: <EditTeacher />,
            loader: EditTeacherLoader,
            action: EditTeacherAction,
          },
          {
            path: ':id/delete',
            element: <DeleteTeacher />,
            action: DeleteTeacherAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
