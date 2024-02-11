import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { updateAccountChain, updateAccountHost } from "../state/account";
import { useEffect } from "react";
import { getAccount } from "../api/chain";
import { getAccount as getAccountHost } from "../api/host/account";

const ProtectedRoute = ({ redirectTo, children }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await getAccount(cookies.token);
        dispatch(updateAccountChain(resp));
        resp = await getAccountHost();
        dispatch(updateAccountHost(resp));
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchData();
  }, []);

  // Fetch account data
  return children;
};

export default ProtectedRoute;
