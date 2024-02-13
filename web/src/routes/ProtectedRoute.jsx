import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { updateAccountChain, updateAccountHost, updateAccountContracts, } from "../state/account";
import { useEffect } from "react";
import { getAccount as getAccountChain } from "../api/chain";
import { getAccount as getAccountHost, getContracts, } from "../api/host/account";

const ProtectedRoute = ({ redirectTo, children }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token", 'account']);
  const navigate = useNavigate();
  const id = useSelector((state) => state.account.id);

  useEffect(() => {
    console.log(cookies.token);
    const fetchData = async () => {
      try {
        const [accountChain, accountHost, contracts] = await Promise.all([
          await getAccountChain(cookies.token),
          await getAccountHost(cookies.account.id ?? id),
          await getContracts(cookies.account.id ?? id),
        ]);
        console.log(contracts);
        dispatch(updateAccountChain(accountChain));
        dispatch(updateAccountHost(accountHost));
        dispatch(updateAccountContracts(contracts));
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  // Fetch account data
  return children;
};

export default ProtectedRoute;
