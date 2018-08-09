const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

class EmailService {
	constructor() {
		sgMail.setApiKey(SENDGRID_API_KEY);
	}

	sendEmail(msg, reciver, sender = `no_reply@observerbsa18.com`) {
		sgMail.send({
			to: reciver,
			from: sender,
			subject: msg.subject,
			text: msg.text
		});
	}
}

module.exports = new EmailService();
