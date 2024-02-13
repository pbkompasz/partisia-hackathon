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
import Account from "../pages/protected/Account.jsx";
import Routes from "../components/logistics/Routes.jsx";
import Orders from "../components/manufacturer/Orders.jsx";
import Reports from "../components/manufacturer/Reports.jsx";

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
    element: (
      <ProtectedRoute redirectTo="/">
        <Settings />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute redirectTo="/">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "routes",
        element: (
          // <ProtectedRoute redirectTo="/" user={"logistics"}>
          <Routes />
          // </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          // <ProtectedRoute redirectTo="/" user={"logistics"}>
          <Orders />
          // </ProtectedRoute>
        ),
      },
      {
        path: "reports",
        element: (
          // <ProtectedRoute redirectTo="/" user={"logistics"}>
          <Reports />
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
