require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }, 
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log('Erreur de connexion SMTP:', error);
  } else {
    console.log('Connexion SMTP réussie !');
  }
});