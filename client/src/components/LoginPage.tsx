import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

//helpers
import { login, checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";

// types
import { CurrentUser } from "../../globalTypes";
import Footer from "./Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    (async () => setCurrentUser(await checkAuth()))();
  }, []);

  // makes page public only
  useEffect(() => {
    if (currentUser?.status === "authed") {
      navigate("/user", { replace: true });
    }
  }, [currentUser]);

  return (
    <>
      <Header currentUser={currentUser} />
      <main className="small-page">
        <h1>Please Login</h1>
        <form
          action={async (formData) => {
            setCurrentUser(await login(formData));
            navigate("/user", { replace: true });
          }}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Mr. Meeple"
            autoFocus
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Keep it a secret"
          />
          <button className="pop-btn" type="submit">
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
