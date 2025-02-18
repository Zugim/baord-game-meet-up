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

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <h2>Please Login</h2>
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
          <button type="submit">Login</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
