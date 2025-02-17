import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// helpers
import { getAllUserData, logout, checkAuth } from "./helpers/fetchHelpers";

//components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

// types
import { User } from "../globalTypes";

// styles
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => setUserData(await getAllUserData()))();
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  /* ~~~~~~~~~~ LOGGING ~~~~~~~~~~ */
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  return (
    <>
      <header>
        <Link to="/" className="btn-link">
          <div className="logo">bgmu</div>
        </Link>
        <div className="auth-controls">
          {currentUser ? (
            <button
              onClick={() => {
                logout();
                setCurrentUser(null);
                navigate("/");
              }}
            >
              Logout
            </button>
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
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage setCurrentUser={setCurrentUser} />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <footer>
        <button onClick={checkAuth}>Check Auth &lt;DEV&gt;</button>
      </footer>
    </>
  );
}

export default App;
