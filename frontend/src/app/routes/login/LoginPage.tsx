import { selectTheme } from "../../../features/theme/themeSlice";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
  const mode = useAppSelector(selectTheme);
  const [register, setRegister] = useState(false);

  const loginViewStyles = `relative w-[95%] md:w-5/6 max-w-120 m-4 mt-8 bg-${mode}-secondary rounded-lg border-${mode}-slate flex flex-col gap-4 lg:gap-8 border-2 items-center py-8`;
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
