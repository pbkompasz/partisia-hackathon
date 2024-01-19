import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import CommonLayout from "../../components/layout/CommonLayout";
import { useState } from "react";

function TokenDialog(props) {
  const { open, onClose } = props;

  return (
    <Dialog onClose={() => onClose('random-token-close')} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <Typography>Your generated token</Typography>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Store your private token in the browser"
      />
      <Typography>
        ! This is your unique token. Do not share it with anyone. If you lose it
        you will not be able to access your token unless the administrator of
        your organization grants you access.
      </Typography>
      <Button onClick={() => onClose('random-token-button')}>Close</Button>
    </Dialog>
  );
}

const Invite = (props) => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [token, setToken] = useState("");

  const handleModalClose = (generatedToken) => {
    setShowTokenModal(false);
    setToken(generatedToken);
  }

  return (
    <CommonLayout>
      <h1>Invite</h1>
      <Typography>
        {props.name} invited you to join {props.organization} as a {props.role}
      </Typography>
      <Box component="form" className="form" noValidate autoComplete="off">
        <div className="form__section">
          <Typography sx={{ fontSize: 24 }}>
            Enter your information below
          </Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField required id="first-name" label="First name" />
              </Grid>
              <Grid item xs={6}>
                <TextField required id="last-name" label="Last name" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  required
                  id="email"
                  label="Email address"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      style={{ width: "100%" }}
                      required
                      id="token"
                      label="Partisia token"
                      value={token}
                    />
                  </Grid>
                  <Grid item xs={4} container justifyContent="center">
                    <Button onClick={() => setShowTokenModal(true)}>
                      I don&apos;t have a token
                    </Button>
                    <TokenDialog
                      open={showTokenModal}
                      onClose={handleModalClose}
                    />
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
    </CommonLayout>
  );
};

export default Invite;
