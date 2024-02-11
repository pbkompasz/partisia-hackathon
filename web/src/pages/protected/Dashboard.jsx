import { Card } from "@mui/material";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
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
import { useEffect, useState } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

// TODO Frontend
// Driver add marker
// Actions demo
// Routes page

import Map from "../../components/reusable/Map";

const DriverDashboard = () => {
  const [actions] = useState([
    {
      id: 1,
      name: "Final drop-off",
      takePhotos: true,
      loggingLevel: 1,
      isFragile: true,
      description: "Drop off final destination",
      address:
        "e6429a8b424fa8a4d91ff5746af787f9985d8aafa18a8d7d8fa8c9c050461bfc",
    },
    {
      id: 2,
    },
  ]);
  const [currentActionId] = useState(1);
  const [expanded, setExpanded] = useState(currentActionId);

  const hour = new Date().getHours();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.down("md"));

  const search = useLocation().search;
  // TODO to add markers
  const mapMode = new URLSearchParams(search).get("map_mode");

  const [mapContractAddress] = useState(
    "020a0771d73fdd491fecfdf77f73badfaf5d8c46e0"
  );

  return (
    <Grid container>
      <Grid item md={8} xs={12}>
        <Stack direction="row-reverse" pb={1} gap={1}>
          <div
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Link
              href={`https://browser.testnet.partisiablockchain.com/contracts/${mapContractAddress}`}
              target="_blank"
            >
              {mapContractAddress}
            </Link>
          </div>
          Current map contract:
        </Stack>
        <Map height="45vh" width="100%" mode={mapMode}></Map>
      </Grid>
      <Grid item xs={12} md={4} style={{ padding: "0 2rem" }}>
        <Stack direction="row" pb={1} gap={1}>
          Transport contract:
          <div
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Link
              href={`https://browser.testnet.partisiablockchain.com/contracts/${mapContractAddress}`}
              target="_blank"
            >
              {mapContractAddress}
            </Link>
          </div>
        </Stack>
        {actions.map((action) => (
          <Accordion
            expanded={expanded === action.id}
            onChange={handleChange(action.id)}
            defaultExpanded={action.id === currentActionId}
            key={action.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                style={{ width: "100%" }}
              >
                <Stack direction="row" gap={1}>
                  {action.name},
                  <div
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Link
                      href={`https://browser.testnet.partisiablockchain.com/transactions/${action.address}`}
                      target="_blank"
                    >
                      {action.address}
                    </Link>
                  </div>
                </Stack>
                {action.id === currentActionId && (
                  <div
                    style={{
                      background: "red",
                      borderRadius: "5px",
                      padding: "5px",
                      marginRight: "1rem",
                      color: "white",
                    }}
                  >
                    Current
                  </div>
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {action.description}
              <Stack gap={1} style={{ margin: "1rem 0" }}>
                {action.loggingLevel === 1 && (
                  <Stack direction="row">
                    <TextField
                      id="outlined-basic"
                      label="Weight"
                      variant="outlined"
                    />
                  </Stack>
                )}
                {action.isFragile && (
                  <Stack direction="row">
                    <FormControlLabel
                      control={<Switch />}
                      label="Is it damaged"
                    />
                  </Stack>
                )}
                {action.takePhotos && (
                  <Stack direction="row">
                    <Button variant="outlined">Upload photo</Button>
                  </Stack>
                )}
              </Stack>
            </AccordionDetails>
            <AccordionActions style={{ padding: "0.5rem 1rem" }}>
              <Button>Completed</Button>
            </AccordionActions>
          </Accordion>
        ))}
      </Grid>
      <Grid item style={{ paddingTop: "1rem" }} md={4} xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography fontSize={24} style={{ textDecoration: "underline" }}>
            Current Area
          </Typography>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  `${hour}:00`,
                  `${hour + 1}:00`,
                  `${hour + 2}:00`,
                  `${hour + 3}:00`,
                  `${hour + 4}:00`,
                ],
              },
            ]}
            series={[
              { data: [10, 8, 7, 7, 3], stack: "A", label: "Packages" },
              { data: [4, 5, 4, 3, 2], stack: "B", label: "Traffic" },
              { data: [1, 1, 3, 2, 0], stack: "B", label: "Incidents" },
            ]}
            width={mdMatches ? window.innerWidth : window.innerWidth / 3 - 50}
            height={260}
          />
        </Box>
      </Grid>
      <Grid item md={4} xs={12} style={{ paddingTop: "1rem", height: "300px" }}>
        <Card style={{ height: "100%" }}>
          <Typography fontSize={24} style={{ textDecoration: "underline" }}>
            News and Notes
          </Typography>
          <p>Nothing here</p>
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

  const [option, setOption] = useState("indiv");
  const [stockPerformanceReportIndiv] = useState([
    { id: 0, value: 10, label: "Sold" },
    { id: 1, value: 15, label: "In production" },
    { id: 2, value: 20, label: "In order" },
  ]);
  const [stockPerformanceReportColl] = useState([
    { id: 0, value: 50, label: "Sold" },
    { id: 1, value: 150, label: "In production" },
    { id: 2, value: 180, label: "In order" },
  ]);
  const [quarterlyReportIndiv] = useState([
    { id: 0, value: 30, label: "Sold" },
    { id: 1, value: 15, label: "In order" },
  ]);
  const [quarterlyReportColl] = useState([
    { id: 0, value: 300, label: "Sold" },
    { id: 1, value: 10500, label: "In order" },
  ]);

  const handleChange = (event, newOption) => {
    setOption(newOption);
  };

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
                <TableCell>Item</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Weight(g)</TableCell>
                <TableCell align="right">Urgent</TableCell>
                <TableCell align="right">Fragile</TableCell>
                <TableCell align="right">Logging level</TableCell>
                <TableCell align="right">Visual proof</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length ? (
                rows.map((row) => (
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
      </Grid>

      <Grid item xs={6} container>
        <Grid item xs={12} alignItems="start">
          <ToggleButtonGroup
            color="primary"
            value={option}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="indiv">Individual</ToggleButton>
            <ToggleButton value="coll">Collective</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Typography
            fontSize={24}
            style={{ textDecoration: "underline", paddingTop: "2rem" }}
          >
            Current Sales Performance
          </Typography>
          <PieChart
            series={[
              {
                data:
                  option === "indiv"
                    ? stockPerformanceReportIndiv
                    : stockPerformanceReportColl,
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            fontSize={24}
            style={{ textDecoration: "underline", paddingTop: "2rem" }}
          >
            Financial Report
          </Typography>
          <PieChart
            series={[
              {
                data:
                  option === "indiv"
                    ? quarterlyReportIndiv
                    : quarterlyReportColl,
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
      <Breadcrumbs aria-label="breadcrumb" style={{ paddingBottom: "1rem" }}>
        <Link underline="hover" color="inherit" href="/">
          *
        </Link>
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
      </Breadcrumbs>
      {role === "driver" ? (
        <DriverDashboard></DriverDashboard>
      ) : role === "dispatcher" ? (
        <DispatcherDashboard></DispatcherDashboard>
      ) : (
        <ManufacturerDashboard></ManufacturerDashboard>
      )}
    </div>
  );
};

export default Dashboard;
