import { Link, useNavigate } from "react-router-dom";
import { selectTheme, toggleTheme } from "../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { FaMoon, FaSun } from "react-icons/fa";
import { resetUser, selectUser } from "../features/user/userSlice";
import MyButton from "../common/MyButton";
import { useLogoutMutation } from "./services/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import ProfilePicture from "../common/ProfilePicture";

export default function Navbar({ onBurgerClick }: { onBurgerClick: () => void }) {
  const mode = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

        {user.username && (
          <>
            <ProfilePicture className="~h-5/9 ~w-5/9" username={user.username} picturePath={user.picturePath} />
            <h2 className="text-content hidden font-semibold lg:block">{user.username}</h2>
            <MyButton onClick={handleLogout}>Logout</MyButton>
          </>
        )}

        {!user.username && <MyButton onClick={() => navigate("/login")}>Login</MyButton>}
      </ul>
    </nav>
  );
}
