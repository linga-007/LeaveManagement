const nodemailer = require('nodemailer');

const Email = async(req, res) =>{
    const { emailContent } = req.body;

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'voiceassistantcheck@gmail.com',
      pass: 'dnqm wejc qsyd ywhb'
      }
    });

    const mailOptions = {
        to: req.body.manager,
        subject: req.body.subject,
        html: emailContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
}

module.exports = {Email};