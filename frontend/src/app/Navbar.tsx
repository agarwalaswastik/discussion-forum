import { Link, useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { FaMoon, FaSun } from "react-icons/fa";
import { resetUser, selectUser } from "../features/user/userSlice";
import MyButton from "../common/MyButton";
import { useLogoutMutation } from "./services/auth";

export default function Navbar() {
  const mode = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoStyles = `text-2xl font-bold sm:text-3xl lg:text-4xl text-${mode}-accent`;
  const navStyles = `flex items-center justify-between border-b-2 p-4 lg:p-6 border-b-${mode}-slate`;

  const handleLogout = () => {
    (async () => {
      try {
        await logout({});
        dispatch(resetUser());
        alert("Logged out Succesfully");
      } catch (error) {
        alert("Logout was unsuccesful, Please clear browsing data");
      }
    })().catch((error) => console.log(error));
  };

  return (
    <nav className={navStyles}>
      <Link to="/">
        <h1 className={logoStyles}>greennit</h1>
      </Link>
      <ul className="flex items-center gap-4">
        <li className="flex items-center">
          <button onClick={() => dispatch(toggleTheme())}>{mode === "light" ? <FaMoon /> : <FaSun />}</button>
        </li>

        {user.username && (
          <>
            <h2 className={`text-content font-semibold text-${mode}-text`}>{user.username}</h2>
            <MyButton onClick={handleLogout}>Logout</MyButton>
          </>
        )}

        {!user.username && <MyButton onClick={() => navigate("/login")}>Login</MyButton>}
      </ul>
    </nav>
  );
}
