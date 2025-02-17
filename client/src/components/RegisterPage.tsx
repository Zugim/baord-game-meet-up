import { useNavigate } from "react-router";

// helpers
import { register } from "../helpers/fetchHelpers";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Register</h2>
      <form
        action={async (formData) => {
          await register(formData);
          navigate("/login");
        }}
      >
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="Mr. Meeple" autoFocus />
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
    </>
  );
}
