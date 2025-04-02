const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Function to send email
function sendConfirmationEmail(email, userDetails, eventDetails, pdfBuffer) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'odewumiolumide832@gmail.com', // Your email
            pass: 'ghkm blib hvel vqpx' // Your email password
        }
    });

    const mailOptions = {
        from: 'odewumiolumide832@gmail.com',
        to: email,
        subject: 'Event Registration Confirmation',
        html: generateEmailHTML(userDetails, eventDetails),
        attachments: [{
            filename: 'event-confirmation.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf'
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Function to generate PDF content using Puppeteer
async function generatePDFContent(userDetails, eventDetails) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9; }
                .container { max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2c3e50; padding-bottom: 20px; }
                .company-info { text-align: right; }
                .title { font-size: 20px; color: #333; margin: 0; }
                .invoice-info { margin: 20px 0; }
                .event-details { margin-top: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
                th { background-color: #eaeaea; }
                .total { font-weight: bold; }
                .footer { margin-top: 20px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Event Registration Confirmation</h2>
                <p><strong>Name:</strong> ${userDetails.name}</p>
                <p><strong>Email:</strong> ${userDetails.email}</p>
                <p><strong>Phone:</strong> ${userDetails.phone}</p>
                <p><strong>Event:</strong> ${eventDetails.name}</p>
                <p><strong>Date:</strong> ${eventDetails.date}</p>
                <p><strong>Location:</strong> ${eventDetails.location}</p>
                <p>Thank you for registering!</p>
            </div>
        </body>
        </html>
    `;

    await page.setContent(content);
    const pdfBuffer = await page.pdf();
    await browser.close();
    return pdfBuffer;
}

// Endpoint to handle email sending
app.post('/send-email', async (req, res) => {
    const { email, userDetails, eventDetails } = req.body;

    const pdfBuffer = await generatePDFContent(userDetails, eventDetails);
    sendConfirmationEmail(email, userDetails, eventDetails, pdfBuffer);
    res.status(200).json({ message: 'Email sent successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});