if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
require("dotenv").config();
const http = require("http").Server(app);
app.use(bodyParser.json());

// CORS setup: Move this to the top and add options handling for all routes.

app.use(
  cors({
    origin: "https://abubakar11786-portfolio.vercel.app", // Replace with your frontend's Vercel domain
    credentials: true, // Allow cookies for authentication (if needed)
  })
);

// // Handle preflight requests globally
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// Additional middleware
app.use(express.json());

const PORT = process.env.PORT || 8181;

// Nodemailer configuration
let transporter = nodemailer.createTransport({
  service: "gmail", // Email service provider
  auth: {
    user: process.env.EMAIL_USERNAME, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password or app-specific password
  },
});

// Test route
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Server listerning",
  });
});

// Contact form route
app.post("/submitContactForm", async (req, res) => {
  const { name, email, subject, message } = req.body;

  let mailOptionsToYou = {
    from: email,
    to: process.env.EMAIL_USERNAME,
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  let mailOptionsToUser = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Contact Form Submitted",
    text: `Thank you for getting in touch, ${name}. Your form has been submitted, and Abubakar will contact you very soon!`,
  };

  try {
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToUser);

    res.status(200).send({
      success: true,
      message: "Form submitted successfully, and emails sent!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({
      // Use 500 status for errors
      success: false,
      message: "Error submitting form or sending email.",
    });
  }
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
