import { useNavigate } from "react-router";

//helpers
import { login } from "../helpers/fetchHelpers";

// types
import { User } from "../../globalTypes";

type LoginPageProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function LoginPage({ setCurrentUser }: LoginPageProps) {
  const navigate = useNavigate();

  return (
    <>
      <h2>Please Login</h2>
      <form
        action={async (formData) => {
          setCurrentUser(await login(formData));
          navigate("/");
        }}
      >
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="Mr. Meeple" autoFocus />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Keep it a secret" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
