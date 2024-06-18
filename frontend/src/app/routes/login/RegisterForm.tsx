import { FormikHelpers } from "formik";
import { useAppDispatch } from "../../hooks";
import { RegisterArgs, useRegisterMutation } from "../../services/auth";
import { setUser } from "../../../features/user/userSlice";
import MyForm from "./MyForm";
import MyTextField from "../../../common/MyTextField";
import Loading from "../../../common/Loading";

export default function RegisterForm() {
  const [register, { isLoading, error, isError }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const errorMessage = error?.message;
  const initialValues: RegisterArgs = { email: "", username: "", password: "", confirmPassword: "" };

  const handleSubmit = async (values: RegisterArgs, actions: FormikHelpers<RegisterArgs>) => {
    try {
      const payload = await register(values).unwrap();
      dispatch(setUser(payload));
      actions.resetForm();
    } catch (error) {
      /* empty */
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <MyForm initialValues={initialValues} onSubmit={handleSubmit}>
        <MyTextField isError={isError} id="email" name="email" placeholder="Email" required autoComplete="email" />
        <MyTextField
          isError={isError}
          id="username"
          name="username"
          placeholder="Username"
          required
          autoComplete="username"
        />
        <MyTextField
          isError={isError}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        <MyTextField
          isError={isError}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          autoComplete="new-password"
        />
      </MyForm>
      {error && <p className="text-content text-red-500">{errorMessage}</p>}
      {isLoading && <Loading />}
    </>
  );
}
