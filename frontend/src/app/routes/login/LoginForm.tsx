import { FormikHelpers } from "formik";
import { useAppDispatch } from "../../hooks";
import { LoginArgs, useLoginMutation } from "../../services/auth";
import { setUser } from "../../../features/user/userSlice";
import MyForm from "./MyForm";
import MyTextField from "../../../common/MyTextField";
import Loading from "../../../common/Loading";

export default function LoginForm() {
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const errorMessage = error?.message;
  const initialValues: LoginArgs = { emailOrUsername: "", password: "" };

  const handleSubmit = async (values: LoginArgs, actions: FormikHelpers<LoginArgs>) => {
    try {
      const payload = await login(values).unwrap();
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
        <MyTextField
          isError={isError}
          id="emailOrUsername"
          name="emailOrUsername"
          placeholder="Email or Username"
          required
        />
        <MyTextField isError={isError} type="password" id="password" name="password" placeholder="Password" required />
      </MyForm>
      {error && <p className="text-content text-red-500">{errorMessage}</p>}
      {isLoading && <Loading />}
    </>
  );
}