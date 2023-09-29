import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTrip } from "../data/api";

// TODO: Style the date picker
// TODO: Form validation

const NewTripForm = ({ updateTripGrid }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (formData, { resetForm }) => {
    const tripCreatedSuccess = await createTrip(formData);

    if (tripCreatedSuccess) {
      // Handle successful response
      await updateTripGrid();
      resetForm();
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="User ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userId}
                name="userId"
                error={!!touched.userId && !!errors.userId}
                helperText={touched.userId && errors.userId}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="startDate"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                name="endDate"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Privacy"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.privacyStatus}
                name="privacyStatus"
                error={!!touched.privacyStatus && !!errors.privacyStatus}
                helperText={touched.privacyStatus && errors.privacyStatus}
                sx={{ gridColumn: "span 2" }}
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

const checkoutSchema = yup.object().shape({});

const initialValues = {
  userId: 1,
  location: "Auckland",
  startDate: "2023-07-03",
  endDate: "2023-07-25",
  status: "planning",
  privacyStatus: "closefriends",
};

export default NewTripForm;
