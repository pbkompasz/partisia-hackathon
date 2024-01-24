import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.jsx";
import App from "../pages/common/App.jsx";
import Tracking from "../pages/common/Tracking.jsx";
import Login from "../pages/common/Login.jsx";
import Register from "../pages/common/Register.jsx";
import Error404 from "../pages/common/Error404.jsx";
import Invite from "../pages/common/Invite.jsx";
import Dashboard from "../pages/protected/Dashboard.jsx";
import Layout from "../components/layout/Layout.jsx";
import Settings from "../pages/protected/Settings.jsx";
import Routes from "../components/logistics/Routes.jsx";

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
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "routes",
        element: (
          // <ProtectedRoute redirectTo="/" user={"logistics"}>
            <Routes />
          // </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
