import { useState, useEffect } from "react";
import { getAllUserData } from "./helpers/fetchHelpers";
import { Routes, Route } from "react-router";

// helpers
import { checkAuth } from "./helpers/fetchHelpers";

//components
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
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <button onClick={checkAuth}>Check Auth</button>
    </>
  );
}

export default App;
