import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// helpers
import { checkAuth } from "../helpers/fetchHelpers";

// types
import { User } from "../../globalTypes";

export default function UserPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  useEffect(() => {
    console.log("IN PROFILE", currentUser);
    if (currentUser?.status === "unauthed") navigate("/");
  }, [currentUser]);

  return (
    <>
      {currentUser?.status !== "unauthed" && (
        <>
          <h2>Hello {currentUser?.username}...</h2>
          <p>{currentUser?.city}</p>
        </>
      )}
    </>
  );
}
