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
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import DialogActions from '@mui/material/DialogActions';
import { useLocation } from "react-router-dom";

import { getReports } from "../../api/host/reports";

function ReportDialog(props) {
  const { onClose, report = {}, open } = props;

  useEffect(() => {
    console.log(report);
  });

  const handleClose = () => {
    onClose();
  };

  const formatDate = (dateString) => {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", dateOptions);
  };

  const formatLabel = (labelString) => {
    let temp = labelString.replace("_", " ");
    const words = temp.split(" ");

    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(" ");
  };

  const isDisabled = () => {
    const today = new Date();
    return today < new Date(report.start_date) && today > new Date(report.due_date)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          {report?.name}
          {report?.status === "upcomming" ? (
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
          ) : report?.status === "completed" ? (
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
        </Stack>
      </DialogTitle>
      <Divider></Divider>
      <Stack justifyContent="space-between" style={{ width: "45vw", height: "50vh", padding: "1rem" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>Report type:</span>{" "}
          <span> {report?.type}</span>
          <br />
          <span style={{ fontWeight: "bold" }}>
            Submission start date:
          </span>{" "}
          <span> {formatDate(report?.start_date)}</span>
          <br />
          <span style={{ fontWeight: "bold" }}>Due date:</span>{" "}
          <span> {formatDate(report?.due_date)}</span>
          <br />
          <span style={{ fontWeight: "bold" }}>Contract address:</span>{" "}
          <span> {report?.address}</span>
        </div>
        <Divider></Divider>
        <Stack gap={2} p={1}>
          {report?.inputs?.map((input) => (
            <TextField
              key={input}
              id={`outlined-basic-${input}`}
              label={formatLabel(input)}
              variant="outlined"
              style={{ maxWidth: "12rem" }}
              disabled={isDisabled}
            />
          ))}
        </Stack>
        <DialogActions>
          <Button autoFocus onClick={handleClose} disabled={isDisabled}>
            Submit data
          </Button>
        </DialogActions>
      </Stack>
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
      <Stack direction="row-reverse">
        <Button onClick={() => setOpenCreate(true)}>Create new report</Button>
      </Stack>
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
