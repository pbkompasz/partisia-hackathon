import { Card, Button, TextField, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { connectMpcWalletClick } from "../../chain/authenticate";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";

import CommonLayout from "../../components/layout/CommonLayout";
import { login } from "../../api/host/authentication";
import { updateAccountLogin, updateAccountHost } from "../../state/account";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MainCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: "70%",
    height: "60%",
    padding: "2rem",
  },
  [theme.breakpoints.down('md')]: {
    width: "100%",
    minHeight: "100vh",
    padding: "1rem",
  },
}));

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
  const handleLogin = async () => {
    const { jwt, account } = await login(email, password);
    console.log(jwt, account);
    setCookie('jwt_token', jwt);
    setCookie('account', account);
    dispatch(updateAccountHost(account));
    if (token)
      navigate('/dashboard');
  };

  // Establish a connection with the blockchain
  const handleConnect = async () => {
    const address = await connectMpcWalletClick();
    setToken(address);
    console.log(address);
    setCookie("token", address);
    // dispatch(updateAccountLogin(resp));
    setLoading(true);
    await delay(2000);
    if (cookies['jwt_token'])
      navigate("/dashboard");
    setLoading(false);
  };

  return (
    <CommonLayout>
      <Stack
        justifyContent="center"
        style={{ height: "100vh" }}
        alignItems="center"
      >
        <MainCard>

          <Stack gap={2} alignItems="center">
            <h1>Login</h1>
            <Stack direction="row" justifyContent="center" alignItems="center" flexWrap="wrap" gap={2} style={{padding: '1rem', minWidth: "50%"}}>
              <TextField
                required
                style={{minWidth: "70%"}}
                id="email"
                label="Enter your Partisia token"
                disabled
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
              <Button onClick={submitToken} disabled variant="contained">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Password"
                type="password"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Stack direction="row" gap={2}>
                <Button onClick={handleLogin} variant="contained">Login</Button>
                <Button href="/register">Register</Button>
              </Stack>
            </Stack>
            <>{error}</>
          </Stack>
        </MainCard>
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
