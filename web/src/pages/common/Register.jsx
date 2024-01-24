import { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

import CommonLayout from "../../components/layout/CommonLayout";
import PersonalInformation from "../../components/reusable/PersonalInformation";
import TokenDialog from "../../components/reusable/TokenDialog";
import chain from "../../chain/authenticate";

const steps = [
  "Provide or generate your private token",
  "Enter your details",
  "Enter your organization's details",
  "Verify submitted information",
];

const StepContainer = ({ children }) => {
  return (
    <Card
      variant="outlined"
      style={{
        height: 500,
        minHeight: 500,
        maxWidth: "100%",
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const GenerateTokenStep = ({ account, setAccount }) => {
  let [token, setToken] = useState(account.token);
  const [verifing, setVerifing] = useState(false);
  let [verified, setVerified] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);

  const handleModalClose = (generatedToken) => {
    setShowTokenModal(false);
    verifyToken(generatedToken);
    chain.validateToken(generatedToken);
    setToken(generatedToken);
  };

  const verifyToken = (token) => {
    setVerifing(true);
    chain.validateToken(token);
    setVerified(true);
    setVerifing(false);
    setAccount((prev) => {
      console.log(prev);
      prev.token = token;
      console.log(prev);
      return prev;
    });
  };

  return (
    <StepContainer>
      <h1>Enter your token</h1>
      <Stack>
        <Stack direction="row" gap={2}>
          <TextField
            style={{ width: "100%" }}
            disabled={token}
            id="token"
            label="Partisia token"
            value={token}
            onChange={(event) => setToken(event.target.value)}
          />
          <Button
            onClick={verifyToken}
            disabled={verified}
            endIcon={
              verified ? (
                <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
              ) : (
                token && <CancelIcon color="warning"></CancelIcon>
              )
            }
          >
            Verify
          </Button>
        </Stack>

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
        <Button disabled={verified} onClick={() => setShowTokenModal(true)}>
          I don&apos;t have a token
        </Button>
        <TokenDialog open={showTokenModal} onClose={handleModalClose} />
      </Stack>
    </StepContainer>
  );
};
const PersonalDetailsStep = ({ account, setAccount }) => {
  return (
    <StepContainer>
      <Grid container spacing={2}>
        <PersonalInformation
          account={account}
          setAccount={setAccount}
        ></PersonalInformation>
      </Grid>
    </StepContainer>
  );
};

const OrganizaitonDetailsStep = ({ account, setAccount }) => {
  const [option, setOption] = useState("manufacturer");

  return (
    <StepContainer>
      <Grid
        container
        spacing={6}
        alignItems="stretch"
        style={{ minHeight: "200px" }}
      >
        <Grid item xs={6}>
          <Item onClick={() => setOption("manufacturer")}>
            {option === "manufacturer" && (
              <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            )}
            Manufacturing
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item onClick={() => setOption("logistics")}>
            {option === "logistics" && (
              <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            )}
            Logistics
          </Item>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={account.companyName}
            onChange={(e) =>
              setAccount((prev) => {
                prev.companyName = e.target.value;
                return prev;
              })
            }
          ></TextField>
        </Grid>
      </Grid>
    </StepContainer>
  );
};

const FinalStep = ({ account }) => {
  return (
    <StepContainer>
      <Typography>Verify that everything is correct</Typography>
      <Stack alignItems="start">
        <Typography fontSize={24} style={{textDecoration: "underline"}}>Block chain</Typography>
        <Typography>Token: {account.token}</Typography>
        <Divider/>
        <Typography fontSize={24} style={{textDecoration: "underline"}}>Personal Information</Typography>
        <Typography>First name: {account.firstName}</Typography>
        <Typography>Last name: {account.lastName}</Typography>
        <Typography>Email address: {account.email}</Typography>
        <Typography fontSize={24} style={{textDecoration: "underline"}}>Company Information</Typography>
        <Typography>Company name: {account.companyName}</Typography>
      </Stack>
    </StepContainer>
  );
};

const getStep = (step, account, setAccount) => {
  if (step === 0) {
    return <GenerateTokenStep account={account} setAccount={setAccount} />;
  } else if (step === 1) {
    return <PersonalDetailsStep account={account} setAccount={setAccount} />;
  } else if (step === 2) {
    return (
      <OrganizaitonDetailsStep account={account} setAccount={setAccount} />
    );
  } else if (step === 3) {
    return <FinalStep account={account} setAccount={setAccount} />;
  } else {
    return <Typography sx={{ mt: 2, mb: 1 }}>Step {step + 1}</Typography>;
  }
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  cursor: "pointer",
}));

const Register = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [account, setAccount] = useState({
    token: "asd",
    firstName: "peter",
    lastName: "Kompasz",
    email: "Kompasz@asd.com",
    companyName: "My Company",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleFinish = () => {
    // TODO
    // createAccount(account);
    navigate("/login");
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <CommonLayout>
      <Box sx={{ maxWidth: "80%", padding: "8rem 2rem" }}>
        <Stepper activeStep={activeStep} style={{ marginBottom: "2rem" }}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {getStep(activeStep, account, setAccount)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* TODO Check if allowed */}
              {activeStep === steps.length - 1 ? (
                <Button onClick={handleFinish}>Finish</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </Box>
          </Fragment>
        )}
      </Box>
    </CommonLayout>
  );
};

export default Register;
