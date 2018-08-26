import * as React from 'react';

class Profile extends React.Component {
	render() {
		const user = sessionStorage.getItem('observerUser');
		return (
			<div>
				<h3>{user}</h3>
			</div>
		);
	}
}

export default Profile;
