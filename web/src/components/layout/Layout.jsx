import { useState, forwardRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, useSearchParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RouteIcon from "@mui/icons-material/Route";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Drawer from "@mui/material/Drawer";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import AddchartIcon from "@mui/icons-material/Addchart";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { enable } from "../../state/demo";

import "./Layout.scss";
import { changeRole } from "../../state/authentication";

const Link = forwardRef(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  return (
    <ListItem button component={Link} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
};

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("demo")) {
      dispatch(enable());
      // const role = searchParams.get("role") ?? "logistics-driver";
      // dispatch(setRole(role));
      // fetchDemoData(role);
    }
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const username = useSelector((state) => state.auth.username);
  const isDemo = useSelector((state) => state.demo.status);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(open);
  };

  const list = (type) => {
    let items = [];
    if (type === "manufacturer") {
      items = [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: <DashboardIcon />,
        },
        {
          name: "Orders",
          href: "/dashboard/orders",
          icon: <ReceiptLongIcon />,
        },
        {
          name: "Reports",
          href: "/dashboard/reports",
          icon: <BarChartIcon />,
        },
      ];
    } else if (type === "dispatcher") {
      items = [
        {
          name: "Map",
          href: "/dashboard",
          icon: <DashboardIcon />,
        },
        {
          name: "Routes",
          href: "/dashboard/routes",
          icon: <RouteIcon />,
        },
      ];
    } else {
      items = [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: <DashboardIcon />,
        },
        // {
        //   name: "Routes",
        //   href: "/dashboard/routes",
        //   icon: <RouteIcon />,
        // },
      ];
    }
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {items.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemLink
                to={item.href}
                primary={item.name}
                icon={item.icon}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemLink
              to="/settings"
              primary="Settings"
              icon={<SettingsApplicationsIcon />}
            />
          </ListItem>
        </List>
      </Box>
    );
  };

  const navigate = useNavigate();

  const addMarker = () => {
    navigate("/dashboard?map_mode=edit");
  };

  const addItem = () => {};
  const generateReport = () => {
    navigate("/dashboard/reports?mode=create");
  };

  const driverActions = [
    { icon: <AddIcon />, name: "Add new map marker", onclick: addMarker },
  ];

  const manufacturerActions = [
    { icon: <AddIcon />, name: "Add new item", onclick: addItem },
    {
      icon: <AddchartIcon />,
      name: "Generate Report",
      onclick: generateReport,
    },
  ];

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/account");
        }}
      >
        My account
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Stack className="layout">
      <Box sx={{ flexGrow: 1 }} style={{ width: "100vw" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              {role}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {isDemo && (
              <>
                <p
                  style={{
                    background: "red",
                    borderRadius: "5px",
                    padding: "5px 10px",
                  }}
                >
                  DEMO
                </p>
                <FormControl
                  variant="standard"
                  style={{ width: "10rem", margin: "0 1rem" }}
                >
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Age"
                    onChange={(e) => {
                      dispatch(changeRole({ role: e.target.value }));
                      navigate("/dashboard");
                    }}
                  >
                    <MenuItem value="dispatcher">Dispatcher</MenuItem>
                    <MenuItem value="driver">Driver</MenuItem>
                    <MenuItem value="manufacturer">Manufacturer</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer open={drawer} anchor="left" onClose={toggleDrawer(false)}>
          {list(role)}
        </Drawer>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {(role === "driver" ? driverActions : manufacturerActions).map(
            (action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onclick}
              />
            )
          )}
        </SpeedDial>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <main>
        {children}
        <Outlet />
      </main>
    </Stack>
  );
};

export default Layout;
