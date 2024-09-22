import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ShipmentList from "../components/ShipmentList";
import ToggleButton from "../components/ToggleButton";
import {
  fetchAllShipments,
  fetchDelayedShipments,
} from "../services/shipmentService";

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [delayedShipments, setDelayedShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDelayed, setShowDelayed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all shipments on component mount
  useEffect(() => {
    const loadShipments = async () => {
      try {
        const allShipments = await fetchAllShipments();
        setShipments(allShipments);
        setFilteredShipments(allShipments); 
      } catch (err) {
        setError("Failed to fetch shipments");
      } finally {
        setLoading(false);
      }
    };

    loadShipments();
  }, []);

  // Fetch delayed shipments after shipments are loaded
  useEffect(() => {
    const loadDelayedShipments = async () => {
      try {
        const delayed = await fetchDelayedShipments();
        setDelayedShipments(delayed);
      } catch (err) {
        console.error("Error fetching delayed shipments:", err);
      }
    };

    loadDelayedShipments();
  }, [shipments]);

  // Filter shipments based on the search term
  function handleSearch(searchTerm) {
    setSearchTerm(searchTerm); 

    if (!shipments || !Array.isArray(shipments)) {
      console.error("shipments is undefined or not an array");
      return;
    }

    const filteredData = shipments.filter(
      (item) =>
        item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredShipments(filteredData);
  }

  // Toggle between showing all shipments and delayed shipments
  const handleShowDelayed = () => {
    if (showDelayed) {
      console.log("Showing all shipments:", shipments);
      setFilteredShipments(shipments);
    } else {
      console.log("Showing delayed shipments:", delayedShipments);
      setFilteredShipments(delayedShipments);
    }
    setShowDelayed(!showDelayed);
  };

  // Show loading state while data is being fetched
  if (loading) {
    return <p>Loading shipments...</p>;
  }

  // Show error state if fetching failed
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shipment Dashboard</h1>

      <div className="flex justify-between items-center mb-4">
        {/* Search Bar with increased width */}
        <div className="w-3/4">
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        </div>

        {/* Use the ToggleButton component here */}
        <ToggleButton showDelayed={showDelayed} onToggle={handleShowDelayed} />
      </div>

      {/* Shipment List */}
      <ShipmentList shipments={filteredShipments} />
    </div>
  );
};

export default Dashboard;
