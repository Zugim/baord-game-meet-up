import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

// helpers
import {
  getAllUserData,
  getAllMeetingData,
  getAllBoardGameData,
  checkAuth,
} from "./helpers/fetchHelpers";

//components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserPage from "./components/UserPage";
import MeetingPage from "./components/MeetingPage";
import NotFoundPage from "./components/NotFoundPage";

// types
import { User, Meeting, BoardGame, CurrentUser } from "../globalTypes";

// styles
import "./App.css";

function App() {
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
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<HomePage meetingData={meetingData} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/meeting/:id" element={<MeetingPage />} />
    </Routes>
  );
}

export default App;
