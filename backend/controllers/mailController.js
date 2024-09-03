const nodemailer = require('nodemailer');

const Email = async (req, res) => {
    const { email, html } = req.body;
    console.log("heloooooooooooooooooooooooooooooooooooooo");

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Email service provider
        auth: {
            user: 'voiceassistantcheck@gmail.com', // Gmail address
            pass: 'dnqmwejcqsydywhb', // Gmail app-specific password
        },
    });

    const mailOptions = {
        from: 'voiceassistantcheck@gmail.com', // Sender email address
        to: email, // Recipient email address from request body
        subject: 'Leave Request', // Subject of the email
        html: html, // HTML content from request body
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
};

module.exports = { Email };
