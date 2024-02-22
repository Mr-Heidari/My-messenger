import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./router/Loginpage.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import SignUpPage from "./router/SignupPage";
import MessengerHomePage from "./router/Home.tsx";
import GoToTheMessengerPage from "./router/GoToTheMessengerPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoToTheMessengerPage />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="SignUp" element={<SignUpPage />} />
        <Route path="Home" element={<MessengerHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(<App />);
