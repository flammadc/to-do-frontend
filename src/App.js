import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Other from "./pages/Other";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/other" element={<Other />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
