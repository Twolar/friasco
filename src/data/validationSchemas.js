import * as yup from "yup";

export const NewUserValidationSchema = yup.object().shape({
  role: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
});

export const NewTripValidationSchema = yup.object().shape({
  userId: yup.number().required("userId required"),
  location: yup.string().required("location required"),
  startDate: yup.date().required("startDate required"),
  endDate: yup
  .date()
  .required("required")
  .when("startDate", (startDate, schema) => {
    return (
      startDate &&
      schema.min(startDate, "End date must be later than start date")
    );
  }),
  status: yup.string().required("status required"),
  privacyStatus: yup.string().required("privacyStatus required"),
});

export const EditTripValidationSchema = yup.object().shape({
  userId: yup.number().required("userId required"),
  location: yup.string().required("location required"),
  startDate: yup.date().required("startDate required"),
  endDate: yup.date().required("endDate required"),
  status: yup.string().required("status required"),
  privacyStatus: yup.string().required("privacyStatus required"),
}).test('dates', 'Start date must be earlier than end date', function(value) {
  const { startDate, endDate } = value;
  if (startDate && endDate) {
    return startDate <= endDate;
  }
  return false;
});