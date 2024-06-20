import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectThemeMode, toggleTheme } from "../../features/theme/themeSlice";
import { resetUser, selectLoggedInUser } from "../../features/user/userSlice";
import ThemedButton from "../../common/ThemedButton";
import ProfilePicture from "../../common/ProfilePicture";
import { useLogoutMutation } from "../services/auth";

export default function Navbar({ onBurgerClick }: { onBurgerClick: () => void }) {
  const mode = useAppSelector(selectThemeMode);
  const user = useAppSelector(selectLoggedInUser);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    void (async () => {
      try {
        dispatch(resetUser());
        await logout({});
        alert("Logged out Succesfully");
      } catch (error) {
        alert("Logout was unsuccesful, Please clear browsing data");
      }
    })();
  };

  return (
    <nav className="border-b-slate flex items-center justify-between border-b-2 ~p-2/4">
      <div className="flex items-center gap-4">
        <button className="lg:hidden" onClick={onBurgerClick}>
          <GiHamburgerMenu />
        </button>

        <Link to="/">
          <h1 className="text-accent font-bold ~text-2xl/4xl">greennit</h1>
        </Link>
      </div>

      <ul className="flex items-center gap-4">
        <li className="flex items-center">
          <button onClick={() => dispatch(toggleTheme())}>{mode === "light" ? <FaMoon /> : <FaSun />}</button>
        </li>

        {user && (
          <>
            <ProfilePicture className="~h-5/9 ~w-5/9" username={user.username} picturePath={user.picturePath} />
            <h2 className="text-content hidden font-semibold lg:block">{user.username}</h2>
            <ThemedButton onClick={handleLogout}>Logout</ThemedButton>
          </>
        )}

        {!user && <ThemedButton onClick={() => navigate("/login")}>Login</ThemedButton>}
      </ul>
    </nav>
  );
}
