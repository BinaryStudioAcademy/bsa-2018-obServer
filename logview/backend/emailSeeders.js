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
	},
	setPassword(data) {
		return {
			subject: 'Success set of Password in Observer. Observer BSA 2018',
			html: `<p>Hi, ${
				data.name
			}! You are receiving this because your paasword is seccesfully setted</p>`
		};
	},
	addToCompany(data) {
		return {
			subject: `Success adding to company in Observer. Observer BSA 2018`,
			html: `<p>${data.name} is seccesfully added to ${data.company}</p>`
		};
	}
};
