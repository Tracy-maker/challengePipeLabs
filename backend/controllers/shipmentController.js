const shipmentService = require('../services/shipmentService');

// Get all shipments with pagination (default to 1000 limit per page)
const getAllShipments = async (req, res, next) => {
  const { skip = 0, limit = 1000 } = req.query; 

  try {
    const shipments = await shipmentService.fetchShipmentsFromAPI(parseInt(skip), parseInt(limit));
    res.status(200).json(shipments);
  } catch (error) {
    next(error);
  }
};

// Get delayed shipments (this will process and filter delayed shipments)
const getDelayedShipments = async (req, res, next) => {
  try {
    const allShipments = await shipmentService.fetchAllShipments(); 
    const delayedShipments = shipmentService.processShipments(allShipments); 
    res.status(200).json(delayedShipments);
  } catch (error) {
    next(error);
  }
};

// Get a shipment by ID
const getShipmentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const allShipments = await shipmentService.fetchAllShipments(); 
    const shipment = allShipments.find((s) => s.id === id);

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.status(200).json(shipment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllShipments,
  getDelayedShipments,
  getShipmentById,
};
