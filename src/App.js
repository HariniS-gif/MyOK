import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import OKRForm from "./OKRform";
import OKRList from "./OKRList";

function App() {
  const [view, setView] = useState("login");

  const handleLoginSuccess = () => setView("dashboard");
  const handleSignupClick = () => setView("signup");
  const handleLoginClick = () => setView("login");

  return (
    <div>
      {view === "login" && <Login onLoginSuccess={handleLoginSuccess} onSignupClick={handleSignupClick} />}
      {view === "signup" && <Signup onSignupSuccess={handleLoginClick} />}
      {view === "dashboard" && (
        <>
          <OKRForm />
          <OKRList />
        </>
      )}
    </div>
  );
}

export default App;

