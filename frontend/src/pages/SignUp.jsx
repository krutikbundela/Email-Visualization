import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { registerUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect");

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      if (redirectUrl) {
        navigate(decodeURIComponent(redirectUrl));
      } else {
        navigate("/");
      }
    }
  }, [user, isAuthenticated, redirectUrl, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    // Validate form
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);

    // Proceed only if no errors
    if (name && email && password) {
      const userData = { name, email, password };
      dispatch(registerUser(userData));
    }
  };

  return (
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
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                autoComplete="given-name"
                name="Name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                error={nameError} // Highlight field on error
                helperText={nameError ? "Name is required" : ""}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                error={emailError} // Highlight field on error
                helperText={emailError ? "Email is required" : ""}
              />
            </Grid>
            <Grid size={12}>
              <FormControl
                sx={{ mt: 1, width: "100%" }}
                variant="outlined"
                required
                error={passwordError} // Highlight field on error
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <Typography color="error">Password is required</Typography>
                )}
              </FormControl>
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
              <Link
                to={
                  redirectUrl
                    ? `/signin?redirect=${encodeURIComponent(redirectUrl)}`
                    : "/signin"
                }
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
