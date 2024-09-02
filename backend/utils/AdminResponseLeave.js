const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // Email service provider
    auth: {
        user: 'voiceassistantcheck@gmail.com', // Gmail address
        pass: 'dnqmwejcqsydywhb', // Gmail app-specific password
    },
});

const htmlTemplateAccept = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #dddddd; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; padding: 10px;">
      <h1 style="color: #4CAF50; font-size: 24px; margin-bottom: 20px;">Request Approved</h1>
    </div>
    <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        Dear Kishore Kumar,
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        We are pleased to inform you that your request has been <strong>approved</strong>. You can now proceed with the next steps as outlined.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        If you have any questions or need further assistance, please do not hesitate to contact us.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        Thank you for your continued trust and support.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        Best Regards,<br/>
        Gilbarco Veeder-Root
      </p>
    </div>
    <div style="text-align: center; padding-top: 20px;">
      <a href="[Link]" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">View Details</a>
    </div>
    <div style="padding-top: 20px; text-align: center; font-size: 12px; color: #777777;">
      <p>&copy; 2024 Gilbarco Veeder-Root. All rights reserved.</p>
    </div>
  </div>
`;

const htmlTemplateReject = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #dddddd; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; padding: 10px;">
      <h1 style="color: #e74c3c; font-size: 24px; margin-bottom: 20px;">Request Declined</h1>
    </div>
    <div style="padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        Dear Kishore Kumar,
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        We regret to inform you that your request has been <strong>declined</strong>. Unfortunately, we are unable to proceed with the request at this time.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        If you have any questions or would like further clarification, please do not hesitate to reach out to us. We are here to assist you.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        Thank you for your understanding.
      </p>
      <p style="font-size: 16px; line-height: 1.5; color: #333333;">
        Best Regards,<br/>
        Gilbarco Veeder-Root
      </p>
    </div>
    <div style="text-align: center; padding-top: 20px;">
      <a href="[Link]" style="display: inline-block; padding: 10px 20px; background-color: #e74c3c; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">View Details</a>
    </div>
    <div style="padding-top: 20px; text-align: center; font-size: 12px; color: #777777;">
      <p>&copy; 2024 Gilbarco Veeder-Root. All rights reserved.</p>
    </div>
  </div>
`;


const Accepted = (mail) =>{
    // Define the email options
    const mailOptions = {
        // from: 'your-email@gmail.com', // Sender address
        to: mail, // List of receivers
        subject: 'Request Approved', // Subject line
        html: htmlTemplateAccept // HTML body content
    };

    try{
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Email sent: ' + info.response);
          });
    }
    catch(error){
        console.error('Error sending email:', error);
    }
}

const Rejected = (mail) =>{
    // Define the email options
    const mailOptions = {
        // from: 'your-email@gmail.com', // Sender address
        to: mail, // List of receivers
        subject: 'Request Rejected', // Subject line
        html: htmlTemplateReject // HTML body content
    };

    try{
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Email sent: ' + info.response);
          });
    }
    catch(error){
        console.error('Error sending email:', error);
    }
}

module.exports = { Accepted, Rejected };