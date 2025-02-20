import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// helpers
import { register, checkAuth } from "../helpers/fetchHelpers";

//components
import Header from "./Header";
import Footer from "./Footer";

// types
import { CurrentUser } from "../../globalTypes";

export default function RegisterPage() {
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
        <h1>Register</h1>
        <form
          action={async (formData) => {
            await register(formData);
            navigate("/login", { replace: true });
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
            placeholder="Enter a strong password"
          />
          <label htmlFor="city">City</label>
          <input type="text" name="city" placeholder="Tokyo" />
          <label htmlFor="languages">Languages Spoken</label>
          <input
            type="text"
            name="languages"
            placeholder="English, Japanese (Beginner)"
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
