const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
require("dotenv").config();
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

// app.options("/submitContactForm", cors()); // Handle preflight requests

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

const PORT = process.env.PORT || 8181;

let transporter = nodemailer.createTransport({
  service: "gmail", // or any email service provider you're using
  auth: {
    user: process.env.EMAIL_USERNAME, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password or app-specific password
  },
});

app.get("/abu", (req, res) => {
  res.send("Abu");
});
app.post("/submitContactForm", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Send email to yourself
  let mailOptionsToYou = {
    from: email, // user's email
    to: process.env.EMAIL_USERNAME, // your email
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  // Send confirmation email to user
  let mailOptionsToUser = {
    from: process.env.EMAIL_USERNAME, // your email
    to: email, // user's email
    subject: "Contact Form Submitted",
    text: `Thank you for getting in touch, ${name}. Your form has been submitted, and Abubakar will contact you very soon!`,
  };

  try {
    // Send both emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToUser);

    res.status(200).send({
      success: true,
      message: "Form submitted successfully, and emails sent!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(200).send({
      success: false,
      message: "Error submitting form or sending email.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
