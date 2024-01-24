import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import CommonLayout from "../../components/layout/CommonLayout";
import PersonalInformation from "../../components/reusable/PersonalInformation";
import chain from "../../chain/authenticate";
import TokenDialog from "../../components/reusable/TokenDialog";

const Invite = (props) => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [account, setAccount] = useState({});
  const [verifing, setVerifing] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleModalClose = (generatedToken) => {
    setVerifing(true);
    setShowTokenModal(false);
    chain.validateToken(generatedToken);
    setVerifing(false);
    setVerified(true);
    setAccount((prev) => {
      prev.token = generatedToken;
      return prev;
    });
  };

  return (
    <CommonLayout>
      <Box sx={{ maxWidth: "80%", padding: "2rem" }}>
        <h1>Invite</h1>
        <Typography>
          {props.name} invited you to join {props.organization} as a{" "}
          {props.role}
        </Typography>
        <Box component="form" className="form" noValidate autoComplete="off">
          <div className="form__section">
            <Typography sx={{ fontSize: 24 }}>
              Enter your information below
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Grid container spacing={2}>
                <PersonalInformation account={account} setAccount={setAccount}></PersonalInformation>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={8}>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <TextField
                          style={{ width: "100%" }}
                          required
                          id="token"
                          label="Partisia token"
                          value={account.token}
                        />
                        {verified && (
                          <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={4} container justifyContent="center">
                      <Button onClick={() => setShowTokenModal(true)}>
                        I don&apos;t have a token
                      </Button>
                      <TokenDialog
                        open={showTokenModal}
                        onClose={handleModalClose}
                      />
                      {verifing && (
                        <Backdrop
                          sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                          }}
                          open={open}
                        >
                          <CircularProgress color="inherit" />
                        </Backdrop>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Stack direction="row-reverse" style={{ marginTop: "2rem" }}>
                <Button size="large">Submit</Button>
              </Stack>
            </FormControl>
          </div>
        </Box>
      </Box>
    </CommonLayout>
  );
};

export default Invite;
