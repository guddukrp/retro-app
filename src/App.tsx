import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { PAGES } from "./common/constant";
import { useSession, useBackButton } from "./services/SupabaseAuth";

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  // Handle Android hardware back button
  useBackButton();
  const { session, loading } = useSession();

  if (loading) return <div>Loading...</div>;

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to={PAGES.HOME} replace /> : <Login />}
        />
        <Route
          path={PAGES.HOME}
          element={session ? <Home /> : <Navigate to={PAGES.LOGIN} replace />}
        />
        <Route
          path={PAGES.LOGIN}
          element={session ? <Navigate to={PAGES.HOME} replace /> : <Login />}
        />

        {/* Default / unknown route */}
        <Route
          path="*"
          element={
            <Navigate to={session ? PAGES.HOME : PAGES.LOGIN} replace />
          }
        />
      </Routes>
    </HashRouter>
  );
}
