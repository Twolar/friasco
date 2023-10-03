import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTrip } from "../data/api";
import { TripPrivacy, TripStatus } from "../data/enums";

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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Status</InputLabel>
                <Field
                  as={Select}
                  name="status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.status}
                  error={!!touched.status && !!errors.status}
                >
                  {Object.entries(TripStatus).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Field>
                {!!touched.status && !!errors.status && (
                  <FormHelperText error>{errors.status}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel>Privacy</InputLabel>
                <Field
                  as={Select}
                  name="privacyStatus"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.privacyStatus}
                  error={!!touched.privacyStatus && !!errors.privacyStatus}
                >
                  {Object.entries(TripPrivacy).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Field>
                {!!touched.status && !!errors.status && (
                  <FormHelperText error>{errors.status}</FormHelperText>
                )}
              </FormControl>
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

const checkoutSchema = yup.object().shape({
  userId: yup.number().required("required"),
  location: yup.string().required("required"),
  startDate: yup.date().required("required"),
  endDate: yup
    .date()
    .required("required")
    .when("startDate", (startDate, schema) => {
      return (
        startDate &&
        schema.min(startDate, "End date must be later than start date")
      );
    }),
  status: yup.string().required("required"),
  privacyStatus: yup.string().required("required"),
});

const initialValues = {
  userId: 1,
  location: "",
  startDate: new Date().toISOString().substring(0, 10),
  endDate: new Date().toISOString().substring(0, 10),
  status: "",
  privacyStatus: "",
};

export default NewTripForm;
