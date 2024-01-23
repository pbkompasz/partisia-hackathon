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

import Layout from "../../components/layout/Layout";
import Map from "../../components/reusable/Map";

const Dashboard = () => {
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
    const updatedArray = temporaryMarkers.filter(item => item.id !== id);

    setTemporaryMarkers(updatedArray);
  }

  const updateMarker = (id, key, value) => {
    const updatedArray = temporaryMarkers.map(item => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });

    setTemporaryMarkers(updatedArray);
  }

  const saveMarkers = () => {
    setMarkers([...markers, ...temporaryMarkers]);
    setTemporaryMarkers([]);
  }

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            *
          </Link>
          <Link underline="hover" color="inherit" href="/dashboard">
            Dashboard
          </Link>
        </Breadcrumbs>
        <Grid container>
          <Grid item xs={6}>
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
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Code</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Sleep</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                  </TimelineSeparator>
                  <TimelineContent>Repeat</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Stack>
          </Grid>
          <Grid item xs={6}>
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
                  overflowY: "scroll",
                  maxHeight: "200px",
                }}
              >
                {temporaryMarkers.map((marker) => (
                  <Box key={marker.id}>
                    <TextField value={marker.name} onChange={(event) => updateMarker(marker.id, "name", event.target.value)}></TextField>
                    <TextField value={marker.location?.lat} onChange={(event) => updateMarker(marker.id, "lat", event.target.value)}></TextField>
                    <TextField value={marker.location?.lng} onChange={(event) => updateMarker(marker.id, "lng", event.target.value)}></TextField>
                    <Button onClick={() => removeMarker(marker.id)}>X</Button>
                  </Box>
                ))}
              </div>
              <Stack direction="row-reverse">
                {temporaryMarkers.length > 0 && <Button onClick={saveMarkers}>Save new markers</Button>}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Dashboard;
