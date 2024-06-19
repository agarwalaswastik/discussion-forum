import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
  const [register, setRegister] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="bg-secondary border-slate relative m-4 mt-8 flex w-[90%] flex-col items-center rounded-lg border-2 py-8 ~gap-4/8 sm:~w-60/120">
        <h2 className="text-heading">{register ? "Register" : "Log in"}</h2>
        {!register && <LoginForm />}
        {register && <RegisterForm />}
        <p className="text-content cursor-pointer text-sky-500 hover:underline" onClick={() => setRegister(!register)}>
          {register ? "Already have an account? Login here." : "Don't have an account? Register here."}
        </p>
      </div>
    </div>
  );
}
