import { Card, Button, TextField, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { connectMpcWalletClick } from "../../chain/authenticate";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from "@mui/material/Divider";

import CommonLayout from "../../components/layout/CommonLayout";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitToken = async () => {
    try {
      setLoading(true);
      setLoading(false);
      setCookie("token", token);
      navigate("/");
    } catch (e) {
      setError(e);
      removeCookie("token");
    }
  };

  // Login to legacy server
  const handleLogin = () => {};

  // Establish a connection with the blockchain
  const handleConnect = async () => {
    connectMpcWalletClick();
    setLoading(true);
    await delay(2000);
    setLoading(false);
  };

  return (
    <CommonLayout>
      <Stack
        justifyContent="center"
        style={{ height: "100vh" }}
        alignItems="center"
      >
        <Card
          style={{
            width: "70%",
            height: "60%",
            padding: "2rem",
          }}
        >
          <Stack gap={2}>
            <h1>Login</h1>
            <Stack direction="row" gap={2}>
              <TextField
                style={{ width: "100%" }}
                required
                id="email"
                label="Enter your Partisia token"
                disabled
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
              <Button onClick={submitToken} variant="contained">
                Submit
              </Button>
            </Stack>
            <Typography fontWeight={600} fontSize={26}>
              OR
            </Typography>
            <Button onClick={handleConnect} variant="outlined" style={{ width: "300px", margin: "0 auto"}}>
              Connect your MPC Wallet
            </Button>
            <Divider />
            <Stack justifyContent="space-evenly" alignItems="center" gap={2}>
              <TextField
                id="outlined-basic"
                label="Email address"
                variant="outlined"
              />
              <TextField
                id="filled-basic"
                label="Password"
                type="password"
                variant="filled"
              />
              <Button onClick={handleLogin}>Login</Button>
            </Stack>
            <>{error}</>
          </Stack>
        </Card>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </CommonLayout>
  );
};

export default Login;
