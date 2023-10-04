import * as yup from "yup";

export const NewUserValidationSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
  email: yup.string().email("invalid email").required("required"),
});

export const TripValidationSchema = yup.object().shape({
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