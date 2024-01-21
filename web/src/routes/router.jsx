import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";
import App from "../pages/common/App.jsx";
import Tracking from "../pages/common/Tracking.jsx";
import Login from "../pages/common/Login.jsx";
import Register from "../pages/common/Register.jsx";
import Error404 from "../pages/common/Error404.jsx";
import Invite from "../pages/common/Invite.jsx";
import Dashboard from "../pages/protected/Dashboard.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/track",
    element: <Tracking />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/invite",
    element: <Invite />,
  },
  {
    path: "/dashboard",
    element: (
      // <ProtectedRoute redirectTo="/">
        <Dashboard />
      // </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);