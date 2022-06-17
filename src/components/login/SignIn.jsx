import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../store/usersSlice";
import { currentUserIdSetted } from "../../store/statusSlice";
import { useDispatch, useSelector } from "react-redux";

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

export default function SignIn() {
  const [data, setData] = useState({ email: "", password: "" });
  const [signInFailed, setSignInFailed] = useState(false);
  const [errors, setErrors] = useState({ email: null, password: "" });
  const Joi = require("joi-browser");
  const navigate = useNavigate();
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("email"),
    password: Joi.string().required().label("password"),
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

  const dispatch = useDispatch();
  const logInStatus = useSelector(isLoggedIn(data));

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors || {});

    if (errors) return;
    if (logInStatus.status === "success") {
      navigate("/home");
      dispatch(currentUserIdSetted({ userId: logInStatus.userId }));
    } else setSignInFailed(true);
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              {signInFailed && (
                <Grid item xs={12}>
                  <Alert
                    severity="error"
                    onClose={() => setSignInFailed(false)}
                    sx={{ mb: 2 }}
                  >
                    Incorrect email address or password.
                  </Alert>
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={Boolean(errors["password"]) || Boolean(errors["email"])}
            >
              Sign In
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => navigate("/signup")}
                  sx={{ cursor: "pointer" }}
                >
                  {"Don't have an account? Sign up"}
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
