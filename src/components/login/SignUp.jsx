import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isEmailExist,
  userRegistered,
  getUserNumber,
} from "../../store/usersSlice";
import { currentUserIdSetted } from "../../store/statusSlice";

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
import Alert from "@mui/material/Alert";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const isEmailInvaild = useSelector(isEmailExist(data.email));
  const userId = useSelector(getUserNumber);
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);

  const Joi = require("joi-browser");
  const schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(8).label("Password"),
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
    if (errors) return;
    // doSubmit
    if (!isEmailInvaild) {
      navigate("/home");
      dispatch(userRegistered(data));
      dispatch(currentUserIdSetted({ userId: userId }));
    } else setIsRegisterFailed(true);
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
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive promotions and updates."
                />
              </Grid>
              {isRegisterFailed && (
                <Grid item xs={12}>
                  <Alert
                    severity="error"
                    onClose={() => setIsRegisterFailed(false)}
                    sx={{ mb: 2 }}
                  >
                    A user with this email Address already exists. Please try
                    again.
                  </Alert>
                </Grid>
              )}
            </Grid>

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
