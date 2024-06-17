import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import { selectTheme } from "../features/theme/themeSlice";
import { IconContext } from "react-icons";
import { useAppSelector } from "./hooks";
import { selectUser } from "../features/user/userSlice";
import { useLogoutMutation } from "./services/auth";
import Loading from "../common/Loading";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import clsx from "clsx";

export default function App() {
  const mode = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);

  const [, { isLoading }] = useLogoutMutation();

  const [forceSidebar, setForceSidebar] = useState(true);

  return (
    <IconContext.Provider value={{ className: "text-xl sm:text-2xl lg:text-3xl fill-slate-400" }}>
      <BrowserRouter>
        <div className={`app-grid fixed h-screen w-screen`}>
          <header className={`bg-${mode}-secondary col-span-2`}>
            <Navbar onBurgerClick={() => setForceSidebar(!forceSidebar)} />
          </header>
          <aside
            className={clsx(
              forceSidebar ? "block" : "hidden",
              `z-30 col-start-1 row-start-2 overflow-auto lg:block bg-${mode}-secondary`,
            )}
          >
            <Sidebar />
          </aside>
          <main
            className={`col-span-2 col-start-1 row-start-2 overflow-auto lg:col-span-1 lg:col-start-2 bg-${mode}-primary`}
          >
            <Routes>
              <Route path="/login" element={user.email ? <Navigate to="/" /> : <LoginPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {isLoading && <Loading />}
        </div>
      </BrowserRouter>
    </IconContext.Provider>
  );
}
