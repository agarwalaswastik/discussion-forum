import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./routes/login/LoginPage";
import NotFound from "./NotFound";
import Navbar from "./Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
