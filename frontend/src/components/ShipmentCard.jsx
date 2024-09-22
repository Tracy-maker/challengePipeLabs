import React from "react";
import { Link } from "react-router-dom";

function ShipmentCard({ shipment }) {
  return (
    <div className="border p-4 rounded shadow">
      <p>
        <strong>ID:</strong> {shipment.id}
      </p>
      <p>
        <strong>Carrier:</strong> {shipment.carrier}
      </p>
      <p>
        <strong>Status:</strong> {shipment.status}
      </p>
      <Link
        to={`/shipments/${shipment.id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}

export default ShipmentCard;
