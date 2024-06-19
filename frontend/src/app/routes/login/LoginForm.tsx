import { FormikHelpers } from "formik";
import { useAppDispatch } from "../../hooks";
import { setUser } from "../../../features/user/userSlice";
import ThemedTextField from "../../../common/ThemedTextField";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { LoginArgs, useLoginMutation } from "../../services/auth";
import MyForm from "./MyForm";

export default function LoginForm() {
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const errorMessage = error?.message;
  const initialValues: LoginArgs = { emailOrUsername: "", password: "" };

  const handleSubmit = async (values: LoginArgs, actions: FormikHelpers<LoginArgs>) => {
    try {
      const payload = await login(values).unwrap();
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
        <ThemedTextField
          isError={isError}
          id="emailOrUsername"
          name="emailOrUsername"
          placeholder="Email or Username"
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
          autoComplete="current-password"
        />
      </MyForm>
      {error && <p className="text-content text-red-500">{errorMessage}</p>}
      {isLoading && <LoadingOverlay />}
    </>
  );
}
