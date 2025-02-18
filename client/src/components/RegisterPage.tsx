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

  return (
    <>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <h2>Register</h2>
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
          <button type="submit">Register</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
