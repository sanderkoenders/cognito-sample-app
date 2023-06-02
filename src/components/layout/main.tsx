import { styled } from "@mui/material";

export interface MainProps {
  drawerwidth: number;
}

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<MainProps>(({ theme, drawerwidth: drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `-${drawerWidth}px`,
}));
