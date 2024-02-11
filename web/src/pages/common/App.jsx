import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { theme } from "../../style/colors";
import { useNavigate } from "react-router-dom";

import "./App.css";
import CommonLayout from "../../components/layout/CommonLayout";
// import { login, logout } from "../../state/authentication";
import { useEffect } from "react";

function App() {
  // const [count, setCount] = useState(0)
  const authenticated = useSelector((state) => state.auth.authenticated);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  })

  return (
    <CommonLayout>
      <Stack direction="row-reverse" gap={12} style={{padding: "1rem 6rem 1rem 0", background: theme.palette.primary.main, color: "black"}}>
        <Button href="/register" color="inherit" variant="text">Register</Button>
        <Button color="inherit" variant="text" href="/login">Log in</Button>
        <Button href="/dashboard?demo=1" color="warning" variant="contained">Try the Demo</Button>
      </Stack>
      <Stack>
        <Typography fontSize={26}>ChainMove</Typography>
        <Typography fontSize={24}>ChainMove is a decentralized backend for Logistic Management</Typography>
        <Typography fontSize={24}>By taking advantage of a secure blockchain and Multi-Party Computation you can increase your revenue and profitability</Typography>
        <Typography fontSize={24}>Click <a href="/register">here</a> to create an account</Typography>
      </Stack>
    </CommonLayout>
  );
}

export default App;
