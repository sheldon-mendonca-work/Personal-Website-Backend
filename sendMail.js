import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (userName, userEmail, userMessage) => {

      try {
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: true,
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.REACT_APP_EMAIL_ADDRESS,
            pass: process.env.REACT_APP_EMAIL_PASSWORD,
          },
        });

        // send mail with defined transport object
        
        const info = await transporter.sendMail({
          from: {
            name: userName,
            address: process.env.REACT_APP_EMAIL_ADDRESS
          }, // sender address
          to: ["sheldonmendoncawork123@gmail.com"], // list of receivers
          subject: "From Portfilio website", // Subject line
          text: "Hello from website", // plain text body
          html: `
          <h4>${userEmail}</h4>
          <p>${userMessage}</p>"
          `, // html body
        });
      
        return info.messageId;
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
        
    } catch (error) {
        console.error(error);
    }
}

export default sendMail;