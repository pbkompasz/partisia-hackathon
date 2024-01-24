import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { PieChart } from "@mui/x-charts/PieChart";

import Map from "../../components/reusable/Map";

const DriverDashboard = () => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Map height="50vh" width="100%"></Map>
      </Grid>
      <Grid item xs={4} style={{ padding: "0 2rem" }}>
        {/* These are the tasks, NOTE Include take pictures, notes */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Accordion 2
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            Accordion Actions
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      </Grid>
      <Grid item style={{ paddingTop: "1rem" }} xs={4}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography fontSize={24} style={{ textDecoration: "underline" }}>
            Current Area
          </Typography>
          <BarChart
            series={[
              { data: [10, 8, 7, 7, 3], stack: "A", label: "Packages" },
              { data: [4, 5, 4, 3, 2], stack: "B", label: "Traffic" },
              { data: [1, 1, 3, 2, 0], stack: "B", label: "Incidents" },
            ]}
            width={600}
            height={260}
          />
        </Box>
      </Grid>
      <Grid item xs={4} style={{ paddingTop: "1rem", height: "300px" }}>
        <Card style={{ height: "100%" }}>
          <Typography fontSize={24} style={{ textDecoration: "underline" }}>
            News and Notes
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

const DispatcherDashboard = () => {
  const [temporaryMarkers, setTemporaryMarkers] = useState([]);
  const [markers, setMarkers] = useState([]);

  const handleClick = (latlng) => {
    const marker = {
      id: temporaryMarkers.length,
      name: "Marker",
      location: latlng,
    };
    setTemporaryMarkers([...temporaryMarkers, marker]);
  };

  const removeMarker = (id) => {
    const updatedArray = temporaryMarkers.filter((item) => item.id !== id);

    setTemporaryMarkers(updatedArray);
  };

  const updateMarker = (id, key, value) => {
    const updatedArray = temporaryMarkers.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });

    setTemporaryMarkers(updatedArray);
  };

  const saveMarkers = () => {
    setMarkers([...markers, ...temporaryMarkers]);
    setTemporaryMarkers([]);
  };

  const rows = [];

  return (
    <Grid container>
      <Grid
        item
        xs={6}
        direction="column"
        container
        style={{ padding: "1rem 2rem" }}
      >
        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Divider />
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <h2>Timeline</h2>
            <Timeline position="alternate">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Eat</TimelineContent>
              </TimelineItem>
            </Timeline>
          </Stack>
        </Grid>
      </Grid>

      <Grid item xs={6} style={{ padding: "1rem 0 0 0" }}>
        <Card
          style={{
            height: "75vh",
            textAlign: "left",
            textDecoration: "underline",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Map</h2>
          <Map
            height="400px"
            width="80%"
            onClick={handleClick}
            markers={markers}
            temporaryMarkers={temporaryMarkers}
          ></Map>
          <div
            style={{
              overflowY: "auto",
              maxHeight: "200px",
            }}
          >
            {temporaryMarkers.map((marker) => (
              <Box key={marker.id}>
                <TextField
                  value={marker.name}
                  onChange={(event) =>
                    updateMarker(marker.id, "name", event.target.value)
                  }
                ></TextField>
                <TextField
                  value={marker.location?.lat}
                  onChange={(event) =>
                    updateMarker(marker.id, "lat", event.target.value)
                  }
                ></TextField>
                <TextField
                  value={marker.location?.lng}
                  onChange={(event) =>
                    updateMarker(marker.id, "lng", event.target.value)
                  }
                ></TextField>
                <Button onClick={() => removeMarker(marker.id)}>X</Button>
              </Box>
            ))}
          </div>
          <Stack direction="row-reverse">
            {temporaryMarkers.length > 0 && (
              <Button onClick={saveMarkers}>Save new markers</Button>
            )}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};
const ManufacturerDashboard = () => {
  const rows = [];

  return (
    <Grid
      container
      direction="column"
      style={{ padding: "2rem 0", height: "80vh" }}
    >
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6} container>
        <Grid item xs={6}>
          <Divider />
          <Typography fontSize={24} style={{ textDecoration: "underline", paddingTop: "2rem" }}>
            Current Stock Performance
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Sold" },
                  { id: 1, value: 15, label: "In production" },
                  { id: 2, value: 20, label: "In order" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
        <Grid item xs={6}>
          <Divider />
          <Typography fontSize={24} style={{ textDecoration: "underline", paddingTop: "2rem" }}>
            Export Market Performance
          </Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 30, label: "Sold" },
                  { id: 1, value: 15, label: "In order" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const Dashboard = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div style={{ padding: "2rem" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          *
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
      </Breadcrumbs>
      {role === "logistics-driver" ? (
        <DriverDashboard></DriverDashboard>
      ) : role === "logistics-dispatcher" ? (
        <DispatcherDashboard></DispatcherDashboard>
      ) : (
        <ManufacturerDashboard></ManufacturerDashboard>
      )}
    </div>
  );
};

export default Dashboard;
