import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";

//components
import App from "./App.tsx";

//styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
