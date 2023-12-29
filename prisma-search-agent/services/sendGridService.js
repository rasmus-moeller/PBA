import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import dotenv from 'dotenv';
dotenv.config();
import emailTemplate from '../template/template1.js'

const sendMail = async (receivers, batchSize = 50) => {
    const batches = [];
    while (receivers.length > 0) {
        batches.push(receivers.splice(0, batchSize));
    }

    for (const batch of batches) {
        const promises = batch.map(async (receiver) => {
            console.log(JSON.stringify(receiver));

            const emailContent = emailTemplate(receiver);

            const msg = {
                to: receiver.email,
                from: { name: 'Anothers Legacy', email: 'rm@nofipa.dk' },
                subject: 'Produkter fra din søgeagent er på lager!',
                html: emailContent,
            };

            try {
                await sgMail.send(msg);
                console.log(`Email sent to ${receiver.email}`);
            } catch (error) {
                console.error(`Error sending email to ${receiver.email}:`, error);
            }
        });

        await Promise.all(promises);
    }
};

export default {
    sendMail,
};
