import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import dotenv from 'dotenv';
dotenv.config();
import emailTemplate from '../template/template1.js'

const sendMail = async (receiver) => {

    let test = emailTemplate(receiver)

    const msg = {
    to: receiver,
    from: {name: 'Anothers Legacy', email: 'rm@nofipa.dk'},
    subject: 'Produkter fra din søgeagent er på lager!',
    html: test,
    };

    try {
        await sgMail.send(msg);    
    } catch (error) {
        console.error(error)
    }

}

export default{
    sendMail
}