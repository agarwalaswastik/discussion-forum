import { FormikHelpers } from "formik";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../../features/user/userSlice";
import ThemedTextField from "../../../common/ThemedTextField";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { RegisterArgs, useRegisterMutation } from "../../services/auth";
import MyForm from "./MyForm";

export default function RegisterForm() {
  const [register, { isLoading, error, isError }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const errorMessage = error?.message;
  const initialValues: RegisterArgs = { email: "", username: "", password: "", confirmPassword: "" };

  const handleSubmit = async (values: RegisterArgs, actions: FormikHelpers<RegisterArgs>) => {
    try {
      const payload = await register(values).unwrap();
      dispatch(setUser({ loggedInUser: payload }));
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
        <ThemedTextField isError={isError} id="email" name="email" placeholder="Email" required autoComplete="email" />
        <ThemedTextField
          isError={isError}
          id="username"
          name="username"
          placeholder="Username"
          required
          autoComplete="username"
        />
        <ThemedTextField
          isError={isError}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="new-password"
        />
        <ThemedTextField
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
      {isLoading && <LoadingOverlay />}
    </>
  );
}
