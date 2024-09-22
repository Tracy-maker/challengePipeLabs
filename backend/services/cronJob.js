const cron = require("node-cron");
const shipmentService = require("./shipmentService");
const notificationService = require("./notificationService");
const logger = require("../utils/logger");

const startShipmentTrackingJob = () => {
  cron.schedule("0 2 * * *", async () => {
    logger.info("Running scheduled shipment tracking task...");

    try {
      const shipments = await shipmentService.fetchShipmentsFromAPI();
      const delayedShipments = shipmentService.processShipments(shipments);

      if (delayedShipments.length > 0) {
        await notificationService.notifyTeamOfDelays(delayedShipments);
      }
    } catch (error) {
      logger.error("Error during scheduled task:", error.message);
    }
  });
};

module.exports = {
  startShipmentTrackingJob,
};
