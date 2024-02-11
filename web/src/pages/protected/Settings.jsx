import Layout from "../../components/layout/Layout";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Settings = () => {
  return (
    <Layout>
      <Stack gap={2} style={{ padding: "2rem" }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ paddingBottom: "1rem" }}>
          <Link underline="hover" color="inherit" href="/dashboard">
            *
          </Link>
          <Link underline="hover" color="inherit" href="/settings">
            Settings
          </Link>
        </Breadcrumbs>
      </Stack>
    </Layout>
  );
};

export default Settings;
