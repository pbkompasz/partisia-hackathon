import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './pages/common/App.jsx'
import Tracking from './pages/common/Tracking.jsx';
import Register from './pages/common/Register.jsx';
import Error404 from './pages/common/Error404.jsx';
import Invite from './pages/common/Invite.jsx';
import './index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/track',
    element: <Tracking />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/invite',
    element: <Invite />,
  },
  {
    path: '*',
    element: <Error404 />,
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
