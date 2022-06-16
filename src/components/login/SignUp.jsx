import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//mui/material
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Francis Cheng&nbsp;
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const Joi = require("joi-browser");

  const schema = {
    firstName: Joi.string().required().label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("email"),
    password: Joi.string().required().min(8).label("password"),
  };

  const validate = () => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;
    const errors = {};
    error.details.map((error) => {
      errors[error.path[0]] = error.message;
    });
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = Joi.object({ [name]: schema[name] });
    const { error } = newSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    console.log(data);
    if (errors) return;
    // doSubmit
  };
  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
    setErrors(newErrors || {});
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
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
                  value={data["firstName"]}
                  onChange={handleChange}
                  error={Boolean(errors["firstName"])}
                  helperText={errors["firstName"]}
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
                  value={data["lastName"]}
                  onChange={handleChange}
                  error={Boolean(errors["lastName"])}
                  helperText={errors["lastName"]}
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
                  value={data["email"]}
                  onChange={handleChange}
                  error={Boolean(errors["email"])}
                  helperText={errors["email"]}
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
                  autoComplete="current-password"
                  value={data["password"]}
                  onChange={handleChange}
                  error={Boolean(errors["password"])}
                  helperText={errors["password"]}
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive promotions and updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={
                Boolean(errors["firstName"]) ||
                Boolean(errors["lastName"]) ||
                Boolean(errors["password"]) ||
                Boolean(errors["email"])
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => navigate("/signin")}
                  sx={{ cursor: "pointer" }}
                >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
