import * as React from 'react';

class Profile extends React.Component {
	render() {
		const user = JSON.parse(sessionStorage.getItem('user'));
		return (
			<div>
				<h3>{user.name}</h3>
				<h4>{user.company}</h4>
			</div>
		);
	}
}

export default Profile;
