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

import Layout from "../../components/layout/Layout";
import Map from "../../components/reusable/Map";

const Dashboard = () => {
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
                height: "500px",
                textAlign: "left",
                textDecoration: "underline",
                padding: "2rem",
              }}
            >
              <h2>Map</h2>
              <Map height="80%" width="80%"></Map>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Dashboard;
