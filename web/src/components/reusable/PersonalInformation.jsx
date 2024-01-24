import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const PersonalInformation = ({ account, setAccount }) => {
  const onChange = (key, value) => {
    setAccount((prev) => {
      prev[`${key}`] = value;
      return prev;
    })
  }

  return (
    <>
      <Grid item xs={6}>
        <TextField
          value={account.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          required
          id="first-name"
          label="First name"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          value={account.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          required
          id="last-name"
          label="Last name"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={account.email}
          onChange={(e) => onChange("email", e.target.value)}
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
