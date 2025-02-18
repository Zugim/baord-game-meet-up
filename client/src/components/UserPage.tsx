import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// helpers
import { checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";

// types
import { CurrentUser } from "../../globalTypes";

export default function UserPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  // makes page private
  useEffect(() => {
    if (currentUser?.status === "unauthed") {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        {currentUser?.status !== "unauthed" && (
          <>
            <h2>Hello {currentUser?.username}...</h2>
            <p>{currentUser?.city}</p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
