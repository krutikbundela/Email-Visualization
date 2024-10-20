import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import UserOptions from "./layout/UserOptions";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user ,isAuthenticated } = useSelector((state) => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () =>{
    dispatch(logoutUser()).finally(()=>{
      navigate("/signin");
    })
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <Link
              to="/"
              className={`link ${location.pathname === "/" ? "active" : ""}`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DashboardOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  className="css-rizt0-MuiTypography-root-dashboard "
                  primary="Dashboard"
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/emails"
              className={`link ${
                location.pathname === "/emails" ? "active" : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <EmailOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  className="css-rizt0-MuiTypography-root-dashboard "
                  primary="Emails"
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/profile"
              className={`link ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  className="css-rizt0-MuiTypography-root-dashboard "
                  primary="Profile"
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          {!isAuthenticated && (
            <>
              <ListItem>
                <Link
                  to="/signup"
                  className={`link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <HowToRegOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      className="css-rizt0-MuiTypography-root-dashboard "
                      primary="Sign Up"
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  to="/signin"
                  className={`link ${
                    location.pathname === "/signin" ? "active" : ""
                  }`}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <LockOpenOutlinedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      className="css-rizt0-MuiTypography-root-dashboard "
                      primary="Sign In"
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            </>
          )}
          {isAuthenticated && (
            <ListItem>
              <ListItemButton onClick={handleLogOut}>
                <ListItemIcon>
                  <LoginOutlinedIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  className="css-rizt0-MuiTypography-root-dashboard "
                  primary="Log Out"
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
      <Main>
        {isAuthenticated && <UserOptions user={user} />}
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
