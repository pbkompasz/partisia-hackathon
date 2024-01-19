import { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
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

import CommonLayout from "../../components/layout/CommonLayout";
import PersonalInformation from "../../components/reusable/PersonalInformation";

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
        width: 1000,
        height: 500,
        minHeight: 500,
        maxWidth: "100%",
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const GenerateTokenStep = () => {
  let [token, setToken] = useState("");
  let [showTokenGenerator, setShowTokenGenerator] = useState(false);
  let [generated, setGenerated] = useState(false);
  let [verified, setVerified] = useState(false);

  // TODO
  const generateToken = () => {
    setShowTokenGenerator(true);
    setToken("asdfasfd412343214321k");
    setGenerated(true);
  };

  // TODO
  const verifyToken = () => {
    setVerified(true);
  };

  return (
    <StepContainer>
      <h1>Enter your token</h1>
      <Stack>
        {/* TODO Refactor this and in invite to reusable/GenreateToken */}
        <TextField
          style={{ width: "100%" }}
          disabled={generated}
          id="token"
          label="Partisia token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <Button onClick={verifyToken} disabled={generated || verified}>
          Verify
        </Button>
        <Button onClick={generateToken} disabled={generated || verified}>
          I don&apos;t have a token. Generate token!
        </Button>
        {/* TODO Maybe use accordion here */}
        {showTokenGenerator ? (
          <>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Store your private token in the browser"
            />
            <Typography>
              ! This is your unique token. Do not share it with anyone. If you
              lose it you will not be able to access your token unless the
              administrator of your organization grants you access.
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </StepContainer>
  );
};
const PersonalDetailsStep = () => {
  return (
    <StepContainer>
      <Grid container spacing={2}>
        <PersonalInformation></PersonalInformation>
      </Grid>
    </StepContainer>
  );
};

const OrganizaitonDetailsStep = () => {
  return (
    <StepContainer>
      <Grid
        container
        spacing={6}
        alignItems="stretch"
        style={{ minHeight: "200px" }}
      >
        <Grid item xs={6}>
          <Item onClick={() => {}}>Manufacturing</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Logistics</Item>
        </Grid>
      </Grid>
    </StepContainer>
  );
};

const FinalStep = () => {
  return (
    <StepContainer>
      <Typography>Verify that everything is correct</Typography>
    </StepContainer>
  );
};

const getStep = (step) => {
  if (step === 0) {
    return <GenerateTokenStep />;
  } else if (step === 1) {
    return <PersonalDetailsStep />;
  } else if (step === 2) {
    return <OrganizaitonDetailsStep />;
  } else if (step === 3) {
    return <FinalStep />;
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
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <CommonLayout>
      <Box sx={{ width: "100%" }}>
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
            {getStep(activeStep)}
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
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>
    </CommonLayout>
  );
};

export default Register;
