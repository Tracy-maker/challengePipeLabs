import axios from "axios";

// Base API URL
const BASE_URL = "http://localhost:4000/api/shipments";

// Fetch all shipments
export const fetchAllShipments = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.shipments;
  } catch (error) {
    console.error("Error fetching shipments:", error.message);
    throw new Error("Failed to fetch shipments");
  }
};

// Fetch delayed shipments
export const fetchDelayedShipments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/delayed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching delayed shipments:", error.message);
    return [];
  }
};

// Fetch shipment details by ID
export const fetchShipmentDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
    
  } catch (error) {
    console.error(
      `Error fetching shipment details for ID ${id}:`,
      error.message
    );
    throw new Error("Failed to fetch shipment details");
  }
};
