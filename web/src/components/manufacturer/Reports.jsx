import { useState, useEffect, Fragment } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useLocation } from "react-router-dom";

import { getReports } from "../../api/host/reports";

function ReportDialog(props) {
  const { onClose, report, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{report?.name}</DialogTitle>
    </Dialog>
  );
}

function CreateDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Create new report</DialogTitle>
    </Dialog>
  );
}

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const search = useLocation().search;
  const mode = new URLSearchParams(search).get("mode");

  useEffect(() => {
    const initializeData = async () => {
      setReports(await getReports());
    };
    initializeData();
    if (mode === "create") {
      setOpenCreate(true);
    }
  }, []);

  const openReport = (report) => {
    setSelectedReport(report);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReport(null);
  };

  const handleCloseCreate = async () => {
    setOpenCreate(false);
    setReports(await getReports());
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Breadcrumbs aria-label="breadcrumb" style={{ paddingBottom: "1rem" }}>
        <Link underline="hover" color="inherit" href="/">
          *
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard/reports">
          Reports
        </Link>
      </Breadcrumbs>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Due Date</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.length ? (
              reports.map((report) => (
                <TableRow
                  key={report.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ cursor: "pointer" }}
                    onClick={() => openReport(report)}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      {report.name}
                      <OpenInNewIcon />
                    </Stack>
                  </TableCell>
                  <TableCell align="center">{report.type}</TableCell>
                  <TableCell align="center">{report.start_date}</TableCell>
                  <TableCell align="center">{report.due_date}</TableCell>
                  <TableCell align="center">
                    {report.status === "upcomming" ? (
                      <span
                        style={{
                          borderRadius: "6px",
                          padding: "2px 6px",
                          color: "white",
                          backgroundColor: "#3f50b5",
                        }}
                      >
                        Upcomming
                      </span>
                    ) : report.status === "completed" ? (
                      <span
                        style={{
                          borderRadius: "6px",
                          padding: "2px 6px",
                          color: "black",
                          backgroundColor: "lightGreen",
                        }}
                      >
                        Completed
                      </span>
                    ) : (
                      <span
                        style={{
                          borderRadius: "6px",
                          padding: "2px 6px",
                          color: "black",
                          backgroundColor: "#b2ebf2",
                        }}
                      >
                        Upcomming
                      </span>
                    )}
                  </TableCell>
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
      <ReportDialog report={selectedReport} open={open} onClose={handleClose} />
      <CreateDialog open={openCreate} onClose={handleCloseCreate} />
    </div>
  );
};

export default Reports;
