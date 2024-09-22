import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShipmentDetails } from "../services/shipmentService";

function ShipmentDetailPage() {
  const { id } = useParams();
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShipmentDetails = async () => {
      try {
        const data = await fetchShipmentDetails(id);
        setShipment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadShipmentDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!shipment) {
    return <div>No shipment details found for this ID</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Shipment Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-bold">
          Customer: {shipment.customer.name}
        </h2>
        <p>
          <strong>Carrier:</strong> {shipment.carrier}
        </p>
        <p>
          <strong>Status:</strong> {shipment.status}
        </p>
        <p>
          <strong>Tracking Number:</strong> {shipment.id}
        </p>
        <p>
          <strong>Address:</strong> {shipment.customer.address},{" "}
          {shipment.customer.city}, {shipment.customer.country}
        </p>
        <p>
          <strong>Shipped Date:</strong>{" "}
          {new Date(shipment.start).toLocaleDateString()}
        </p>
        <p>
          <strong>Delivered Date:</strong>{" "}
          {shipment.end
            ? new Date(shipment.end).toLocaleDateString()
            : "In Transit"}
        </p>
      </div>
    </div>
  );
}

export default ShipmentDetailPage;
