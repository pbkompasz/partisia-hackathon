import { useState, Fragment } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "./Tracking.scss";
import { Grid } from "@mui/material";

// TODO Track package
// TODO Report damaged/mishandled package (specifically go through weight history to check if something is missing)
// TODO Proof of delivery

const DetailedView = ({ authenticated, data = {} }) => {
  const [loading] = useState(false);

  return authenticated ? (
    <>
      {loading ? <CircularProgress /> : <></>}
      <h2>Order no. {data.orderNumber}</h2>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Order placed on: {data.startDate}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Final price: {data.startDate}
          </Typography>
        </CardContent>
      </Card>

      <h3>Sold by {data.orderSender}</h3>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Status: {data.orderStatus}
            </Typography>
            <Button className="">Generate a Proof of Delivery</Button>
          </Stack>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography
                    style={{ fontWeight: "bold" }}
                    sx={{ fontSize: 14 }}
                    gutterBottom
                  >
                    Delivery information
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography
                    style={{ fontWeight: "bold" }}
                    sx={{ fontSize: 14 }}
                    gutterBottom
                  >
                    Invoice information
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography
                    style={{ fontWeight: "bold" }}
                    sx={{ fontSize: 14 }}
                    gutterBottom
                  >
                    Payment method
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <h3>Having issues?</h3>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid
            container
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Grid item xs={6}>
              <Button style={{ width: "100%" }}>
                Didn&apos;t received you package?
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{ width: "100%" }}>I have a complaint</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{ width: "100%" }}>My package is damaged</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{ width: "100%" }}>
                My package has been tampered with/is underweight/is the wrong
                one
              </Button>
            </Grid>
            {/* E.g. my package is damaged */}
            {/* E.g. my package has been tampered with / is underweight / is the wrong one */}
            {/* Here are pictures of your package, select the first one you think your package might have been damaged */}
            {/* User uploads a photo, some operator/AI analyses it, and user can perform the checks */}
          </Grid>
        </CardContent>
      </Card>
      <h3>Product information</h3>
      {/* for item in items */}
      <Stack direction="row" justifyContent="space-between">
        <div>Icon</div>
        <div>
          <span>name</span>
          <span>short description</span>
        </div>
        <div>
          <span>price</span>
          <span>Quantity</span>
        </div>
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-end"
        spacing={2}
      >
        <span>Final price: 100</span>
      </Stack>
    </>
  ) : (
    <></>
  );
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AuthenticationDialog = ({ setAuthentication }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitToken = async () => {
    setLoading(true);
    try {
      await delay(1000);
      // const success = ...
    } catch (error) {
      setError(error.message);
    }

    handleClose();
    setAuthentication(true);
    setLoading(false);
  };

  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        It&apos;s my package
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Submit your token</DialogTitle>
        <DialogContent>
          <OutlinedInput
            id="token-input"
            error={!!error}
            endAdornment={
              <InputAdornment position="start">
                {loading ? <CircularProgress /> : <></>}
              </InputAdornment>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={submitToken}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const Tracking = () => {
  const [authenticated, setAuthentication] = useState(false);
  const [verified, setVerified] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const verify = () => {
    console.log(trackingNumber);
    setVerified(true);
  };

  return (
    <CommonLayout>
      <h1>Track & Trace</h1>
      <Box component="form" className="form" noValidate autoComplete="off">
        <div
          className={`form__section ${
            verified && authenticated ? "form__section--separate" : ""
          }`}
        >
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="track-number">
              Enter your tracking number
            </InputLabel>
            <OutlinedInput
              id="track-number"
              type="text"
              value={trackingNumber}
              onChange={(event) => setTrackingNumber(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    className="form__section__verify-button"
                    onClick={verify}
                  >
                    Verify
                  </Button>
                </InputAdornment>
              }
              label="Enter your tracking number"
            />
          </FormControl>
          <br />
          {verified ? (
            <Stack>
              <Typography
                sx={{ fontSize: 24 }}
                color="text.success"
                gutterBottom
              >
                It is a valid tracking number!
              </Typography>
              <AuthenticationDialog setAuthentication={setAuthentication} />
            </Stack>
          ) : (
            <></>
          )}
        </div>
        {verified ? (
          <div className="form__section">
            <DetailedView authenticated={authenticated} />{" "}
          </div>
        ) : (
          <></>
        )}
      </Box>
      {/* v-show="validation" */}
    </CommonLayout>
  );
};

export default Tracking;
