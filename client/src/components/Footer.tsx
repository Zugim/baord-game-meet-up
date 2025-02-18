// helpers
import { checkAuth } from "../helpers/fetchHelpers";

// styles
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <button onClick={checkAuth}>Check Auth &lt;DEV&gt;</button>
    </footer>
  );
}
