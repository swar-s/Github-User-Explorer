import { useState } from "react";
import "./App.css";
import Logo from "./components/Logo";
import { Route, Routes } from "react-router-dom";
import Users from "./Routes/Users";
import UserInfo from "./Routes/UserInfo";
import RateLimitChecker from "./RateLimitChecker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-black">
      <div className="container text-gray-200 p-3">
        <Logo />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:name" element={<UserInfo />} />
        </Routes>
      </div>
      <footer>
        <RateLimitChecker />
      </footer>
    </div>
  );
}
export default App;
