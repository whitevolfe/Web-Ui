import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { SignIn as signInFunc } from "../BAL/signin";

const schema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignIn() {
  const router = useRouter();

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
          Sign in
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={schema}
          onSubmit={(data, { setSubmitting, setFieldError }) => {
           const result =  signInFunc(data.username, data.password)
                if (result.status === "success") {
                  router.push("/todo");
                } else if (result.status === "password error") {
                  setFieldError("password", result.message);
                } else if (result.status === "username error") {
                  setFieldError("username", result.message);
                } else {
                  setFieldError("username", "Incorrect Username");
                  setFieldError("password", "Incorrect password");
                }
                setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={errors.username && touched.username}
              />
              {errors.username && touched.username && <div style={{ color: "red" }}>{errors.username}</div>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                value={values.password}
              />
              {errors.password && touched.password && (
                <div style={{ color: "red", marginBottom: 3 }}>{errors.password}</div>
              )}
              <div style={{ paddingBottom: 14 }} />
              <Divider />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
                Sign In
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
