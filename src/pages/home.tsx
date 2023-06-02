import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

export const HomePage = () => (
  <Grid container spacing={2} justifyContent="center">
    <Grid item lg={6} xs={12}>
      <Card>
        <CardContent>
          <Box
            sx={{
              marginBottom: 2,
            }}
          >
            <Typography component="h5" variant="h5">
              Home page
            </Typography>
          </Box>
          <Box>
            <Typography component="p">
              This is a small React application that illustrates the use of an
              external login
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);
