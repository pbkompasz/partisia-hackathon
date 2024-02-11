import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const Routes = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          *
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/routes">
          Routes
        </Link>
      </Breadcrumbs>
      <h1>Your routes</h1>
      <h1>Bid</h1>
    </div>
  );
};

export default Routes;
