const { SENDGRID_API_KEY } =  require("../config/email.config");
const emailAPI = require('../config/email.config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'rastawafel03@gmail.com',
        subject: `Hello, ${name}`,
        text: 'Welcome to the app!'
    }); 
};

module.exports = {
    sendWelcomeEmail
}