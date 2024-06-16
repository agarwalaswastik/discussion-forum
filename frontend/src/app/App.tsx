import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import { selectTheme } from "../features/theme/themeSlice";
import { IconContext } from "react-icons";
import { useAppSelector } from "./hooks";

export default function App() {
  const mode = useAppSelector(selectTheme);

  return (
    <IconContext.Provider
      value={{ className: "text-xl sm:text-2xl lg:text-3xl fill-slate-400" }}
    >
      <BrowserRouter>
        <div
          className={`transition-colors text-${mode}-text fixed flex h-screen w-screen flex-col`}
        >
          <header className={`transition-colors bg-${mode}-secondary`}>
            <Navbar />
          </header>
          <div className={`transition-colors bg-${mode}-primary flex-1`}>
            <Routes>
              <Route path="/">
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
