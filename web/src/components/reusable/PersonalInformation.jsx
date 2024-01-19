import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const PersonalInformation = () => {
  return (
    <>
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
    </>
  );
};

export default PersonalInformation;