import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import { selectTheme } from "../features/theme/themeSlice";
import { IconContext } from "react-icons";
import { useAppSelector } from "./hooks";

export default function App() {
  const mode = useAppSelector(selectTheme);

  return (
    <IconContext.Provider value={{ className: "text-xl sm:text-2xl lg:text-3xl fill-slate-400" }}>
      <BrowserRouter>
        <div className={`fixed flex h-screen w-screen flex-col`}>
          <header className={`bg-${mode}-secondary`}>
            <Navbar />
          </header>
          <div className={`bg-${mode}-primary flex-1 overflow-auto`}>
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </IconContext.Provider>
  );
}
