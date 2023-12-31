import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Horas from './routes/Horas.jsx';
import Postulacion from './routes/Postulacion.jsx';
import ValidacionPos from './routes/ValidacionPos.jsx';
import Licencia from './routes/Licencia.jsx';
import SeleccionarHora from './routes/SeleccionarHora.jsx';
import Register from './routes/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path:'/horas',
        element: <Horas />,
      },
      {
        path: '/postulacion',
        element: <Postulacion />,
      },
      {
        path: '/validacionPos',
        element: <ValidacionPos />,
      },
      { 
        path: '/licencias',
        element: <Licencia />,
      },
      

    ],
    
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/SeleccionarHora',
    element: <SeleccionarHora />,
  },
  {
    path: '/Register',
    element: <Register />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
