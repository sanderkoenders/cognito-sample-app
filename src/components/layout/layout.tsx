import BorderAllIcon from "@mui/icons-material/BorderAll";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar } from "./app-bar";
import { DrawerHeader } from "./drawer-header";
import { Main } from "./main";
import { useThemeContext } from "./theme-provider";
import { AuthContext } from "../auth/auth-context";
import { ListItemButton } from "@mui/material";
import { FC } from "react";

const drawerWidth = 240;

export interface LayoutProps {
  children: React.ReactElement;
}

export const Layout: FC = () => {
  const { theme, toggleDarkMode } = useThemeContext();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <CssBaseline />
      <AuthContext.Consumer>
        {({ isLoggedIn, setJwt, getLoginUrl }) => (
          <Box sx={{ display: "flex" }}>
            <AppBar drawerwidth={drawerWidth} position="fixed" open={open}>
              <Toolbar>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={() => setOpen(true)}
                      edge="start"
                      sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      color="inherit"
                      aria-label="toggle darkmode"
                      onClick={() => toggleDarkMode()}
                      edge="start"
                    >
                      {theme.palette.mode === "dark" && <LightModeIcon />}
                      {theme.palette.mode === "light" && <DarkModeIcon />}
                    </IconButton>
                  </Box>
                </Box>
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
              variant="persistent"
              anchor="left"
              open={open}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                      {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </IconButton>
                  </DrawerHeader>
                  <Divider />
                  <List>
                    <ListItemButton component={Link} to="/">
                      <ListItemIcon>
                        <BorderAllIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" secondary="Home page" />
                    </ListItemButton>
                    {isLoggedIn() && (
                      <ListItemButton component={Link} to="/profile">
                        <ListItemIcon>
                          <ScheduleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Profile"
                          secondary="View your profile"
                        />
                      </ListItemButton>
                    )}
                  </List>
                </Box>
                <Box>
                  <Divider />
                  <List>
                    {isLoggedIn() && (
                      <ListItemButton onClick={() => setJwt("")}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    )}

                    {!isLoggedIn() && (
                      <ListItemButton
                        component={Link}
                        to={getLoginUrl({ hello: "world" })}
                      >
                        <ListItemIcon>
                          <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                      </ListItemButton>
                    )}
                  </List>
                </Box>
              </Box>
            </Drawer>
            <Main drawerwidth={drawerWidth} sx={{ width: 1 }}>
              <DrawerHeader />
              <Outlet />
            </Main>
          </Box>
        )}
      </AuthContext.Consumer>
    </>
  );
};
