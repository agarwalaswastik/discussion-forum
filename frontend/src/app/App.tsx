import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import { selectTheme } from "../features/theme/themeSlice";
import { IconContext } from "react-icons";
import { useAppSelector } from "./hooks";
import { selectUser } from "../features/user/userSlice";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";
import clsx from "clsx";
import ProfilePage from "./routes/profile/ProfilePage";

export default function App() {
  const mode = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);

  const [forceSidebar, setForceSidebar] = useState(false);

  return (
    <IconContext.Provider value={{ className: "~text-xl/4xl fill-slate-500" }}>
      <BrowserRouter>
        <div className={clsx("app-grid fixed h-screen w-screen", mode)}>
          <header className="bg-secondary z-40 col-span-2">
            <Navbar onBurgerClick={() => setForceSidebar(!forceSidebar)} />
          </header>
          <aside
            className={`${forceSidebar ? "block" : "hidden"} bg-secondary z-40 col-start-1 row-start-2 overflow-auto lg:block`}
          >
            <Sidebar />
          </aside>
          <main className="bg-primary relative col-span-2 col-start-1 row-start-2 overflow-auto lg:col-span-1 lg:col-start-2">
            <Routes>
              <Route path="/login" element={user.email ? <Navigate to="/" /> : <LoginPage />} />
              <Route path="/profile" element={user.email ? <ProfilePage /> : <Navigate to="/login" />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </IconContext.Provider>
  );
}
