import { authActions } from "../redux/Auth-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./themetoggle";
import { toggleTheme } from "../redux/themeReducer";
import classes from "./Header.module.css";

const Header = () => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const premium = useSelector((state) => state.expense.premium);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const headerClass = isDarkTheme ? classes.header : classes.header2;


  return (
    <header className={headerClass}>
      <h1>Expense Tracker</h1>
      <nav>
        <ul>
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}

          {premium && (
            <li>
              <ThemeToggle
                isDarkTheme={isDarkTheme}
                onToggle={handleToggleTheme}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
