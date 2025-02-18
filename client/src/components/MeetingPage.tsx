import { useState, useEffect } from "react";
import { useLocation } from "react-router";

// helpers
import { checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";

// types
import { CurrentUser } from "../../globalTypes";

export default function MeetingPage() {
  const { state } = useLocation();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {!state ? (
        <main>
          <h1>
            Something went wrong! <span className="emoji">😱</span>
          </h1>
          <h2>Please navigate to meetings via the webpage</h2>
        </main>
      ) : (
        <main>
          <h2>{state.title}</h2>
        </main>
      )}
      <Footer />
    </>
  );
}
