const nodemailer = require("nodemailer");
require("dotenv").config(); 

const sendNotificationEmail = async (shipment) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Shipment Tracker" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO, 
      subject: `Delayed Shipment Alert: ${shipment.trackingNumber}`,
      text: `Shipment with tracking number ${shipment.trackingNumber} is delayed.`,
      html: `<p>Shipment with tracking number <strong>${shipment.trackingNumber}</strong> is delayed.</p>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("[ERROR] Failed to send notification email:", error.message);
    throw error;
  }
};

module.exports = {
  sendNotificationEmail,
};
