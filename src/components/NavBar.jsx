import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserIdSetted } from "../store/statusSlice";
import { getBasicInfoById } from "../store/usersSlice";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Person from "@mui/icons-material/Person";
import Popper from "@mui/material/Popper";
import Snackbar from "@mui/material/Snackbar";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function NavBar() {
  const location = useLocation();
  const getColor = (path) => (path === location.pathname ? "primary" : "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const popperRef = useRef(null);
  useEffect(() => {
    function handleClickOUtside(event) {
      if (popperRef.current && !popperRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    }
    document.addEventListener("mousedown", handleClickOUtside);
    return () => {
      document.removeEventListener("mousedown", handleClickOUtside);
    };
  }, [popperRef]);

  const userId = useSelector((state) => state.status.currentUserId);
  const basicInfo = useSelector(getBasicInfoById(userId));
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const openPopper = Boolean(anchorEl);
  const popperId = openPopper ? "simple-popper" : undefined;
  const togglePopper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleLogOut = () => {
    navigate("/signin");
    dispatch(currentUserIdSetted({ userId: -1 }));
  };
  const handleProfile = () => {
    if (location.pathname !== "/profile") navigate("/profile");
    setAnchorEl(null);
  };

  const listItem = (icon, name, path) => {
    let handleClick = () => {};
    if (typeof path === "function") {
      handleClick = path;
    } else if (path !== location.pathname) {
      handleClick = () => {
        navigate(path);
        setOpen(false);
      };
    }

    return (
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <Typography color={location.pathname === path ? "primary" : ""}>
            {name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    );
  };

  const popper = (
    <Popper id={popperId} open={openPopper} anchorEl={anchorEl} ref={popperRef}>
      <Box
        sx={{
          mt: 3,
          mr: 2,
          p: 2,
          bgcolor: "background.paper",
          borderRadius: "1rem",
          boxShadow: "0 0 10px 1px #999",
        }}
      >
        <Typography>{`${basicInfo.firstName} ${basicInfo.lastName}`}</Typography>
        <Typography variant="caption" sx={{ color: "gray", mb: 2 }}>
          {basicInfo.email}
        </Typography>
        <Divider />
        <Typography
          onClick={handleProfile}
          sx={{
            mt: 1,
            cursor: "pointer",
            "&:hover": { bgcolor: "#f8f8f8" },
          }}
        >
          My Account
        </Typography>

        <Typography
          onClick={handleLogOut}
          sx={{ cursor: "pointer", "&:hover": { bgcolor: "#f8f8f8" } }}
        >
          Log Out
        </Typography>
      </Box>
    </Popper>
  );
  const appbar = (
    <AppBar position="absolute" open={open} sx={{ backgroundColor: "white" }}>
      <Toolbar
        sx={{
          pr: "24px",
          backgroundColor: "#efefef",
        }}
      >
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          noWrap
          sx={{ flexGrow: 1 }}
          color="black"
        >
          Money Bank
        </Typography>
        <Button onClick={togglePopper} startIcon={<Person />}>
          <Typography color="black">{basicInfo.firstName}</Typography>
        </Button>
        {popper}
      </Toolbar>
    </AppBar>
  );
  const drawer = (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {listItem(
          <DashboardIcon color={getColor("/home")} />,
          "Dashboard",
          "/home"
        )}
        {listItem(
          <AccountBalanceIcon color={getColor("/accounts")} />,
          "Accounts",
          "/accounts"
        )}
        {listItem(
          <BarChartIcon color={getColor("/reports")} />,
          "Reports",
          "/reports"
        )}
        <Divider sx={{ my: 1 }} />
        <ListSubheader component="div" inset>
          Settings
        </ListSubheader>
        {listItem(
          <ManageAccountsIcon color={getColor("/profile")} />,
          "My Account",
          "/profile"
        )}
        {listItem(<LogoutIcon />, "Log Out", handleLogOut)}
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ display: "flex" }} onKeyDown={() => setAnchorEl(null)}>
      <CssBaseline />
      {appbar}
      {drawer}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar sx={{ opacity: 0 }} />
        <Outlet />
      </Box>
    </Box>
  );
}
