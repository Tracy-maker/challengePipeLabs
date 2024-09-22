const express = require('express');
const shipmentController = require('../controllers/shipmentController');
const router = express.Router();

router.get('/shipments', shipmentController.getAllShipments);
router.get('/shipments/delayed', shipmentController.getDelayedShipments);
router.get('/shipments/:id', shipmentController.getShipmentById);

module.exports = router; 
