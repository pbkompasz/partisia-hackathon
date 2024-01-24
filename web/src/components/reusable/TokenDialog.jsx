import { useState, } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function TokenDialog(props) {
  const { open, onClose } = props;
  const [token, setToken] = useState("");

  return (
    <Dialog open={open}>
      <Stack gap={2} style={{ padding: "1rem" }}>
        <DialogTitle>Create token</DialogTitle>
        <Typography>Follow these steps to generate your token</Typography>
        <Typography>
          <ol>
            <li>
              Create an account through the{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://chromewebstore.google.com/detail/partisia-wallet/gjkdbeaiifkpoencioahhcilildpjhgh"
              >
                wallet extension
              </a>
            </li>
            <li>Open the extension</li>
            <li>Select the Partisia Blockchain Testnet</li>
            <li>Select your prefered account</li>
            <li>Copy your public token</li>
          </ol>
        </Typography>

        <Typography>Once done you can paste your below</Typography>
        <TextField
          style={{ width: "100%" }}
          required
          id="token"
          label="Partisia token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <Stack direction="row-reverse">
          <Button disabled={!token} onClick={() => onClose(token)}>Close</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default TokenDialog;
