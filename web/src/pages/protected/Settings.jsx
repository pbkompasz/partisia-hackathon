import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import Layout from "../../components/layout/Layout";
import { updateContractState } from "../../chain/wallet-integration";
import { setContractState } from "../../state/map-contract";
import { sign } from "../../chain/contract/map-api";
import { useEffect } from "react";

const Settings = () => {
  // const contracts = useSelector((state) => state.account.contracts);
  const contracts = useSelector((state) => state.account.contracts);
  const [cookies] = useCookies(["token", 'account']);
  const mapContract = useSelector((state) => state.mapContract);
  const dispatch = useDispatch();
  useEffect(() => {
    // updateContractState(
    //   "map",
    //   "028f19a1d88c7511798eab03f89accf43943047630"
    // ).then((contractState) => {
    //   console.log(contractState);
    //   dispatch(
    //     setContractState({
    //       // ...contractState,
    //       description: contractState.description,
    //       // startDateUtcMillis: contractState.startDateUtcMillis.words[0],
    //     })
    //   );
    //   signAction("028f19a1d88c7511798eab03f89accf43943047630", cookies.token);
    // });
    contracts.map((contract) => {
      // updateContractState(contract.name, contract.address).then(
      //   (contractState) => {
      //     console.log(contractState);
      //     dispatch(
      //       setContractState({
      //         ...contractState,
      //         startDateUtcMillis: contractState.startDateUtcMillis.words[0],
      //       })
      //     );
      //   }
      // );
    });
  }, []);

  return (
    <Layout>
      <Stack gap={2} style={{ padding: "2rem" }} alignItems="start">
        <Breadcrumbs aria-label="breadcrumb" style={{ paddingBottom: "1rem" }}>
          <Link underline="hover" color="inherit" href="/dashboard">
            *
          </Link>
          <Link underline="hover" color="inherit" href="/settings">
            Settings
          </Link>
        </Breadcrumbs>
        <h1>Your contracts: {contracts.length}</h1>
        {contracts.map((contract) => {
          return (
            <div key={contract.address}>
              {contract.name}: {contract.address}
            </div>
          );
        })}
      </Stack>
    </Layout>
  );
};

export default Settings;
