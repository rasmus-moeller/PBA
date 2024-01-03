import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import dotenv from 'dotenv';
dotenv.config();
import emailTemplate from '../template/template1.js'
import creationTemplate from '../template/creation.js'

const sendMail = async (receivers, handle, image, batchSize = 50) => {
    const batches = [];
    while (receivers.length > 0) {
        batches.push(receivers.splice(0, batchSize));
    }

    for (const batch of batches) {
        const promises = batch.map(async (receiver) => {
            console.log(JSON.stringify(receiver));

            const emailContent = emailTemplate(receiver, handle, image);

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

        // Wait for the batch to complete before moving to the next one
        await Promise.all(promises);
    }
};

const sendCreationMail = async (email, password) => {

    const emailContent = creationTemplate(email, password);
    const msg = {
        to: email,
        from: { name: 'Anothers Legacy', email: 'rm@nofipa.dk' },
        subject: 'Søgeagent oprettet - her er dit login',
        html: emailContent,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
    }
}

export default {
    sendMail,
    sendCreationMail
};
