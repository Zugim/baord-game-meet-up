import { Link, NavLink, useLocation } from "react-router";

// types
import { CurrentUser } from "../../globalTypes";

// styles
import "./Header.css";

type HeaderProps = {
  currentUser: CurrentUser | null;
};

export default function Header({ currentUser }: HeaderProps) {
  const location = useLocation();

  return (
    <header>
      <Link to="/" className="btn-link">
        <div className="logo">
          bgmu<span className="pop-text">.</span>
        </div>
      </Link>
      <div className="auth-controls">
        {currentUser?.status === "authed" ? (
          <>
            {location.pathname !== "/meeting/create" && (
              <NavLink to="/meeting/create" className="btn-link">
                <button className="pop-btn">Create A Meetup</button>
              </NavLink>
            )}
            {location.pathname !== "/user" && (
              <Link to="/user" className="btn-link">
                <button>Profile</button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/register" className="btn-link">
              <button className="pop-btn">Register</button>
            </Link>
            <Link to="/login" className="btn-link">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
