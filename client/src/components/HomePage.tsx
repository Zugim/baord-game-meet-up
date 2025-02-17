import { Link } from "react-router";

export default function HomePage() {
  return (
    <>
      <h1>Homepage 🏠</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );
}
