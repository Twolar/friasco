import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createUser } from "../data/api";
import { NewUserValidationSchema } from "../data/validationSchemas";

const NewUserForm = ({ updateUserGrid }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (formData, { resetForm }) => {
    const userCreatedSuccess = await createUser(formData);

    if (userCreatedSuccess) {
      // Handle successful response
      await updateUserGrid();
      resetForm();
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={NewUserValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                variant="contained"
                style={{
                  color: colors.grey[100],
                  backgroundColor: colors.greenAccent[600],
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

const initialValues = {
  username: "",
  email: "",
  password: "",
};

export default NewUserForm;
