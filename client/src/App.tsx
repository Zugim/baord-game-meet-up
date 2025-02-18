import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

// helpers
import {
  getAllUserData,
  getAllMeetingData,
  getAllBoardGameData,
  logout,
  checkAuth,
} from "./helpers/fetchHelpers";

//components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserPage from "./components/UserPage";

// types
import { User, Meeting, BoardGame, CurrentUser } from "../globalTypes";

// styles
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userData, setUserData] = useState<User[] | null>(null);
  const [meetingData, setMeetingData] = useState<Meeting[] | null>(null);
  const [boardGameData, setBoardGameData] = useState<BoardGame[] | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
    (async () => setUserData(await getAllUserData()))();
    (async () => setMeetingData(await getAllMeetingData()))();
    (async () => setBoardGameData(await getAllBoardGameData()))();
  }, []);

  /* ~~~~~~~~~~ LOGGING ~~~~~~~~~~ */
  useEffect(() => {
    console.log("CURRENT USER:", currentUser);
  }, [currentUser]);
  useEffect(() => {
    console.log("USER DATA:", userData);
  }, [userData]);
  useEffect(() => {
    console.log("MEETING DATA:", meetingData);
  }, [meetingData]);
  useEffect(() => {
    console.log("BOARD GAME DATA:", boardGameData);
  }, [boardGameData]);
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  return (
    <>
      <header>
        <Link to="/" className="btn-link">
          <div className="logo">bgmu</div>
        </Link>
        <div className="auth-controls">
          {currentUser?.status === "authed" ? (
            <>
              <Link to="/User" className="btn-link">
                <button>Profile</button>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setCurrentUser({ status: "unauthed" });
                  navigate("/");
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
      <main>
        <Routes>
          <Route path="/" element={<HomePage meetingData={meetingData} />} />
          <Route
            path="/login"
            element={<LoginPage setCurrentUser={setCurrentUser} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </main>
      <footer>
        <button onClick={checkAuth}>Check Auth &lt;DEV&gt;</button>
      </footer>
    </>
  );
}

export default App;
