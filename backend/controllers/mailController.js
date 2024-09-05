const nodemailer = require('nodemailer');

const Email = async (req, res) => {
    const { email, html } = req.body;
    console.log("check");

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'voiceassistantcheck@gmail.com', 
            pass: 'dnqmwejcqsydywhb', 
        },
    });

    const mailOptions = {
        from: 'voiceassistantcheck@gmail.com',
        to: email, 
        subject: 'Leave Request', 
        html: html, 
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
