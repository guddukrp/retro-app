import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { PAGES } from "./common/constant";
import { useSession, useBackButton } from "./services/SupabaseAuth";

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useSession();

  if (loading) return <div>Loading...</div>;

  return session ? <>{children}</> : <Navigate to={PAGES.LOGIN} replace />;
};

export default function App() {
  // Handle Android hardware back button
  useBackButton();

  return (
    <HashRouter>
      <Routes>
        <Route
          path={PAGES.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path={PAGES.LOGIN} element={<Login />} />

        {/* Default / unknown route */}
        <Route path="*" element={<Navigate to={PAGES.HOME} replace />} />
      </Routes>
    </HashRouter>
  );
}
