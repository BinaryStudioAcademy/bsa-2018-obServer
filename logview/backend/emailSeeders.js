module.exports = {
	invite(data) {
		return {
			subject: 'Invite to Observer. Observer BSA 2018',
			html: `<p>Hi, ${data.name}! You are receiving this because ${
				data.inviter
			} have invited you to obServer.</p>                    
             	    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                    <p>${data.link}</p>`
		};
	}
};
