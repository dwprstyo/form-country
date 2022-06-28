import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Autocomplete
} from "@mui/material";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';  ?????
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useMemo, useEffect } from "react";
import countryList from "react-select-country-list";
import codetocountry from "country-data";
import axios from "axios";

const theme = createTheme();

export default function SignUp() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);


  useEffect(() => {
    getMyLocation();
  }, []);

  const getMyLocation = () => {
    axios
      .get(`https://ipinfo.io/geo?token=d220494edb935b`)
      .then((res) => {
        const codecountry = res.data.country;
        const convert = codetocountry.countries[codecountry].name
        setValue(convert);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeHandler = (e) => {
    setValue(e.target.value);
    console.log(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="country">Select Country</InputLabel>
                  <Select
                    options={options}
                    value={value}
                    onChange={changeHandler}
                    label="Select Country"
                  >
                    {options.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  options={options}
                  value={value}
                  onChange={(_event, newTeam) => {
                    setValue(newTeam);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Country" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
