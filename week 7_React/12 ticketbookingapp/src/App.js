import React, { useState } from "react";
import GuestPage from "./GuestPage";
import UserPage from "./UserPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ticket Booking Application</h1>

      {isLoggedIn ? (
        <>
          <UserPage />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <GuestPage />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
