import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router";

//components
import App from "./App.tsx";

//styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
