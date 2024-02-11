import Layout from "../../components/layout/Layout";
import { useState, forwardRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { getChain } from "../../api/chain";

const Account = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const username = useSelector((state) => state.auth.username);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);
  const [chain, setChain] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getChain();
      console.log(resp);
      setChain(resp);
    };

    fetchData(); // Call the async function immediately
  }, []);

  return (
    <Layout>
      <Stack gap={2} style={{ padding: "2rem" }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ paddingBottom: "1rem" }}>
          <Link underline="hover" color="inherit" href="/dashboard">
            *
          </Link>
          <Link underline="hover" color="inherit" href="/account">
            Account
          </Link>
        </Breadcrumbs>
        <h1>
          {username} | {role}
        </h1>
        <TextField
          id="outlined-basic"
          style={{ maxWidth: "450px" }}
          label="Token"
          value={token}
          disabled
          variant="outlined"
        />
        <Divider></Divider>
        <Stack direction="row" gap={2}>
          <TextField
            id="outlined-basic"
            style={{ maxWidth: "450px" }}
            label="Blockchain"
            value={chain.chainId}
            disabled
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            style={{ maxWidth: "450px" }}
            label="Governance version"
            value={chain.goveranceVersion}
            disabled
            variant="outlined"
          />
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Account;
