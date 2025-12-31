import React, { useEffect, useState } from "react";
import { fetchRetroItems, addRetroItem, RetroItem } from "./services/SupabaseApi";
import "./App.css";
import Home from "./pages/Home";
// import QrScanner from "./pages/QrScanner";
import Login from "./Login";

export default function App() {
  return (
    <div>
      <Home /> 
      
      {/* <QrScanner /> */}
      {/* <Login />; */}
    
    </div>
  );
}
