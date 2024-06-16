import { Link } from "react-router-dom";
import { selectTheme, toggleTheme } from "../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const mode = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const logoStyles = `text-2xl font-bold sm:text-3xl lg:text-4xl text-${mode}-accent`;
  const navStyles = `flex items-center justify-between border-b-2 p-4 lg:p-6 border-b-${mode}-slate`;

  return (
    <nav className={navStyles}>
      <Link to="/">
        <h1 className={logoStyles}>greennit</h1>
      </Link>
      <ul>
        <li className="flex items-center">
          <button onClick={() => dispatch(toggleTheme())}>
            {mode === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </li>
      </ul>
    </nav>
  );
}
