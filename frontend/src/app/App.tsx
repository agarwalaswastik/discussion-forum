import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import clsx from "clsx";
import NotFound from "./routes/NotFound";
import LoginPage from "./routes/login/LoginPage";
import ProfilePage from "./routes/profile/ProfilePage";
import { useAppSelector } from "./hooks";
import { selectLoggedInUsername } from "../features/user/userSlice";
import { selectThemeMode } from "../features/theme/themeSlice";
import Sidebar from "./scenes/Sidebar";
import Navbar from "./scenes/Navbar";

export default function App() {
  const mode = useAppSelector(selectThemeMode);
  const loggedInUsername = useAppSelector(selectLoggedInUsername);

  const [forceSidebar, setForceSidebar] = useState(false);
  const sidebarDisplay = forceSidebar ? "block" : "hidden";

  return (
    <div className={clsx(mode, "app-grid fixed h-screen w-screen")}>
      <header className="bg-secondary z-40 col-span-2">
        <Navbar onBurgerClick={() => setForceSidebar(!forceSidebar)} />
      </header>
      <aside className={`${sidebarDisplay} bg-secondary z-40 col-start-1 row-start-2 overflow-auto lg:block`}>
        <Sidebar />
      </aside>
      <main className="bg-primary relative col-span-2 col-start-1 row-start-2 overflow-auto lg:col-span-1 lg:col-start-2">
        <Routes>
          <Route path="/login" element={loggedInUsername ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/profile" element={loggedInUsername ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
