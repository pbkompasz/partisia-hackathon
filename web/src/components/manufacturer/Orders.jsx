import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Orders = () => {
  const orders = [];

  return (
    <div style={{ padding: "2rem" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          *
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/orders">
          Orders
        </Link>
      </Breadcrumbs>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length ? (
              orders.map((report) => (
                <TableRow
                  key={report.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {report.name}
                  </TableCell>
                  <TableCell align="right">{report.name}</TableCell>
                  <TableCell align="right">{report.type}</TableCell>
                  <TableCell align="right">{report.date}</TableCell>
                  <TableCell align="right">{report.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  style={{
                    minHeight: "8rem",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Nothing here
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
