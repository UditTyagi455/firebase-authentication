import "./App.css";
import Login from "../src/pages/Login/Index";
import Dashboard from "../src/pages/Dashboard/Index";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthenticationContext } from "./context/Authcontext";
import { useContext } from "react";
import Forgot from "../src/pages/Forgot-Password/index";
import PhoneVerify from "../src/pages/PhoneVerify/Index"


function App() {
  const {token} = useContext(AuthenticationContext);
  return (
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/forgot-password" element={token ? <Navigate to="/dashboard" /> : < Forgot/>} />
        <Route path="/phone-verify" element={token ? <Navigate to="/dashboard" /> : < PhoneVerify/>} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>

  );
}

export default App;
