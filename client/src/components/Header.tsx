import { Link, useNavigate, useLocation } from "react-router";

//helpers
import { logout, checkAuth } from "../helpers/fetchHelpers";

// types
import { CurrentUser } from "../../globalTypes";

// styles
import "./Header.css";

type HeaderProps = {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

export default function Header({ currentUser, setCurrentUser }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header>
      <Link to="/" className="btn-link">
        <div className="logo">bgmu</div>
      </Link>
      <div className="auth-controls">
        {currentUser?.status === "authed" ? (
          <>
            {location.pathname !== "/meeting/create" && (
              <Link to="/meeting/create" className="btn-link">
                <button>Create meeting</button>
              </Link>
            )}
            {location.pathname !== "/user" && (
              <Link to="/user" className="btn-link">
                <button>Profile</button>
              </Link>
            )}
            <button
              onClick={async () => {
                await logout();
                setCurrentUser(await checkAuth());
                navigate("/", { replace: true });
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-link">
              <button>Login</button>
            </Link>
            <Link to="/register" className="btn-link">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
