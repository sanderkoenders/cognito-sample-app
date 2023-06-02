import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCookie } from "../util/use-cookie";
import jwtDecode from "jwt-decode";

export const ProfilePage = () => {
  const { jwt } = useCookie<{ jwt: string }>();

  const decoded = jwtDecode<Record<string, string>>(jwt);

  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item lg={6} xs={12}>
        <Card>
          <CardContent>
            <Box>
              <Typography component="h5" variant="h5">
                Profile
              </Typography>
            </Box>
            <Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Key</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(decoded).map((key) => (
                      <TableRow
                        key={key}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {key}
                        </TableCell>
                        <TableCell>{decoded[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
