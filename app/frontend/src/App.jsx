import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <>
      {window.location.pathname === "/admin" ? (
        isAdmin ? (
          <AdminPage onLogout={() => {
            localStorage.removeItem("token");
            setIsAdmin(false);
            window.location.href = "/";
          }}/>
        ) : (
          <AdminLogin onLogin={() => setIsAdmin(true)} />
        )
      ) : (
        <HomePage />
      )}
    </>
  );
}
