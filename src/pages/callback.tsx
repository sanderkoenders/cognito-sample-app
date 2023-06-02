import { FC, useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/auth/auth-context";
import { useHash } from "../util/use-hash";

type CallbackHashParams = {
  access_token: string;
  token_type: string;
  expires_in: string;
  state: string;
};

const TIMEOUT = 5;

export const CallbackPage: FC = () => {
  const [seconds, setSeconds] = useState<number>(TIMEOUT);

  const {
    access_token: accessToken,
    expires_in: expiresIn,
    state,
  } = useHash<CallbackHashParams>();

  const { setJwt } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && expiresIn) {
      setJwt(accessToken, parseInt(expiresIn));

      setTimeout(() => navigate("/profile"), TIMEOUT * 1000);
    }
  }, [accessToken, expiresIn, setJwt, navigate]);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, [setSeconds]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item lg={6} xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ marginBottom: 2 }}>
              <Typography component="h5" variant="h5">
                Callback page
              </Typography>
            </Box>
            <Box>
              <Typography component="p">
                Login succeeded with state {state}, you are being redirected to
                the profile page in {seconds} seconds.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
