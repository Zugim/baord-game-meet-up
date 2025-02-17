import { useState, useEffect } from "react";
import { getAllUserData } from "./helpers/fetchHelpers";
import { BrowserRouter as Router, Routes, Route } from "react-router";

// helpers
import { logout, checkAuth } from "./helpers/fetchHelpers";

//components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

// styles
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => setUserData(await getAllUserData()))();
  }, []);

  /* ~~~~~~~~~~ LOGGING ~~~~~~~~~~ */
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  return (
    <>
      <h1>Board Game Meet Up App</h1>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
      <button onClick={checkAuth}>Check Auth</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default App;
