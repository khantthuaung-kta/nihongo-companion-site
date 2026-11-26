import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}