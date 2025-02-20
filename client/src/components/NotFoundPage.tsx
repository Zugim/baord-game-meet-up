import { useState, useEffect } from "react";

// helpers
import { checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";

// types
import { CurrentUser } from "../../globalTypes";

export default function NotFoundPage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  return (
    <>
      <Header currentUser={currentUser} />
      <main>
        <h1>
          Page Not Found! <span className="emoji">😱</span>
        </h1>
      </main>
      <Footer />
    </>
  );
}
