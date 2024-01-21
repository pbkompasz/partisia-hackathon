import { Card, Button, TextField, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
      await delay(2000);
      // setLoading(false);
      // setCookie("token", token);
      navigate("/");
    } catch (e) {
      setError(e);
      removeCookie("token");
    }
  };

  // if (cookies.token) {
  //   submitToken();
  // }

  return (
    <CommonLayout>
      <Card
        style={{
          width: "50%", height: "50%", }}
      >
        <h1>Login</h1>
        {/* {cookies.token ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <>Oh! You have a cookie. Let&apos;s try it.</>
            {loading && <CircularProgress />}
          </Stack>
        ) : ( */}
          <>
            <TextField
              style={{ width: "100%" }}
              required
              id="email"
              label="Enter your Partisia token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
            <Button onClick={submitToken}>Submit</Button>
          </>
        {/* )} */}
        <>{error}</>
      </Card>
    </CommonLayout>
  );
};

export default Login;
