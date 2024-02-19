import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./router/Loginpage.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";
import SignUpPage from "./router/SignupPage";
import GoToTheMessengerPage from "./router/GoToTheMessengerPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoToTheMessengerPage />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="SignUp" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
