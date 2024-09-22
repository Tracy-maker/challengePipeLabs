import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ShipmentDetailPage from "./pages/ShipmentDetailsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments/:id" element={<ShipmentDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
