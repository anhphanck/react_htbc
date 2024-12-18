import { useState } from "react";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    localStorage.removeItem("token"); 
  };

  return (
    <main className="bg-primary text-tertiary min-h-screen flex flex-col">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} /> 
      ) : (
        <>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Admin />
        </>
      )}
    </main>
  );
}
