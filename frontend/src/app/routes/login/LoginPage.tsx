import { type FormikHelpers } from "formik";
import { selectTheme } from "../../../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import MyTextField from "../../../common/MyTextField";
import { useState } from "react";
import { useLoginMutation, useRegisterMutation, type LoginArgs, type RegisterArgs } from "../../services/auth";
import Loading from "../../../common/Loading";
import { setUser } from "../../../features/user/userSlice";
import MyForm from "./MyForm";

function LoginForm() {
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

function RegisterForm() {
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
        <MyTextField isError={isError} id="email" name="email" placeholder="Email" required />
        <MyTextField isError={isError} id="username" name="username" placeholder="Username" required />
        <MyTextField isError={isError} type="password" id="password" name="password" placeholder="Password" required />
        <MyTextField
          isError={isError}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
      </MyForm>
      {error && <p className="text-content text-red-500">{errorMessage}</p>}
      {isLoading && <Loading />}
    </>
  );
}

export default function LoginPage() {
  const mode = useAppSelector(selectTheme);
  const [register, setRegister] = useState(false);

  const loginViewStyles = `relative w-[95%] sm:w-5/6 md:w-1/2 max-w-120 m-4 mt-8 bg-${mode}-secondary rounded-lg border-${mode}-slate flex flex-col gap-4 lg:gap-8 border-2 items-center py-8`;
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className={loginViewStyles}>
        <h2 className={`text-heading text-${mode}-text`}>{register ? "Register" : "Log in"}</h2>
        {!register && <LoginForm />}
        {register && <RegisterForm />}
        <p className="text-content cursor-pointer text-sky-500 hover:underline" onClick={() => setRegister(!register)}>
          {register ? "Already have an account? Login here." : "Don't have an account? Register here."}
        </p>
      </div>
    </div>
  );
}
