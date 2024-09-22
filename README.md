
# ABC Fashion Shipment Tracking Solution

## Project Overview

ABC Fashion faces customer dissatisfaction due to delayed or missing shipments. Their current reactive approach, checking tracking only when customers inquire, results in frustration. This project aims to proactively monitor shipments and notify customers of delays to improve customer satisfaction.

## Solution Outline

### Backend (NodeJS):
The backend interacts with the ABC Fashion API to fetch shipment data and identify delays.

1. **Data Fetching**: Fetch shipment data via the `/shipments` API with pagination.
2. **Delay Detection**: Identify delayed shipments based on status and time since last update.
3. **Notifications**: Delayed shipments are flagged. Future enhancements could include automatic email/SMS notifications.
4. **Authentication**: Securely manage API credentials with environment variables.
5. **Error Handling**: Basic error handling for API issues.

### Frontend (ReactJS):
The frontend provides a dashboard for customer service to track shipments.

1. **Dashboard**: Displays all shipments, with delayed ones highlighted.
2. **Filtering**: Allows filtering by shipment status (delayed, shipped, etc.).
3. **Shipment Details**: Provides detailed shipment and customer information.
4. **Future Enhancements**: Automated customer notifications directly via the dashboard.

### Storage & Deployment:
For MVP, use in-memory or file storage. For production, consider databases like MongoDB or PostgreSQL. Deploy backend on Heroku, AWS, or Google Cloud, and frontend on Netlify or Vercel.

## Running the Solution

### Backend:
1. Install dependencies: `npm install`
2. Set up environment variables in `.env`:
   ```
   API_URL=https://abc-fashion-bzwn2mw5ya-km.a.run.app/
   API_USERNAME=pipelabs
   API_PASSWORD=h04Kp5NNm4qN
   ```
3. Start server: `npm start` (Runs on `http://localhost:4000`)

### Frontend:
1. Install dependencies: `npm install`
2. Start app: `npm start` (Runs on `http://localhost:3000`)

### Running the Full App:
1. Start backend.
2. Start frontend.
3. Open the React app at `http://localhost:3000`.

## Future Ideas
- **Automated Notifications**: Notify customers about delays via email/SMS.
- **Carrier Analytics**: Analyze carrier performance and optimize carrier selection.
- **Predictive Analytics**: Predict potential delays using historical data.
- **Database Integration**: Store and query shipment data efficiently.
- **Advanced Filtering**: Add filters by carrier, delivery speed, and location.
