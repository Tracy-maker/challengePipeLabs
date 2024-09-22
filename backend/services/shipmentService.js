const axios = require("axios");
const config = require("../config/config");
const logger = require("../utils/logger");

const isShipmentDelayed = (shipment) => {
  if (!shipment.start) {
    console.warn("Shipment missing start date:", shipment);
    return false;
  }

  const shippedDate = new Date(shipment.start);
  const currentDate = new Date();
  const daysInTransit = (currentDate - shippedDate) / (1000 * 60 * 60 * 24);

  return shipment.status !== "delivered" && daysInTransit > 7;
};

// Fetch paginated shipments
const fetchShipmentsFromAPI = async (skip = 0, limit = 1000) => {
  try {
    const response = await axios.get(
      `${config.API_URL}?skip=${skip}&limit=${limit}`,
      {
        auth: {
          username: config.AUTH.username,
          password: config.AUTH.password,
        },
      }
    );

    if (!Array.isArray(response.data.data)) {
      throw new Error(
        'API did not return an array of shipments in the "data" field'
      );
    }

    return {
      shipments: response.data.data,
      total: response.data.total, //
    };
  } catch (error) {
    console.error("Error fetching shipments:", error.message);
    throw new Error("Failed to fetch shipments");
  }
};

// Retry mechanism for fetching shipments with retries on failure
const retryFetch = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i < retries - 1) {
        console.warn(`Retrying... Attempt ${i + 1}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

const processShipments = (shipments) => {
  if (!Array.isArray(shipments)) {
    console.error("Shipments is not an array:", shipments);
    return [];
  }

  const delayedShipments = shipments.filter(isShipmentDelayed);

 
  logger.info(`Found ${delayedShipments.length} delayed shipments.`);

  return delayedShipments;
};

// Recursive function to fetch and process shipments page by page
const fetchAllShipments = async (limitPerBatch = 1000) => {
  let skip = 0;
  let allShipments = [];
  let totalShipments = 0;

  try {
    do {
      const { shipments, total } = await retryFetch(() =>
        fetchShipmentsFromAPI(skip, limitPerBatch)
      );

      if (totalShipments === 0) {
        totalShipments = total; 
      }

      allShipments = allShipments.concat(shipments);
      skip += limitPerBatch;

      console.log(
        `Fetched ${allShipments.length} of ${totalShipments} shipments...`
      );
    } while (
      allShipments.length < totalShipments &&
      allShipments.length < 1000
    );

    return allShipments;
  } catch (error) {
    console.error("Error fetching all shipments:", error.message);
    throw new Error("Failed to fetch all shipments");
  }
};

// Example to process shipments in batches of 1000
const processDailyShipments = async () => {
  try {
    const allShipments = await fetchAllShipments(250); 
    const delayedShipments = processShipments(allShipments);

    console.log(`Processed ${delayedShipments.length} delayed shipments.`);
  } catch (error) {
    console.error("Error processing daily shipments:", error.message);
  }
};

module.exports = {
  fetchAllShipments,
  processDailyShipments,
  processShipments,
  isShipmentDelayed,
  fetchShipmentsFromAPI,
};
