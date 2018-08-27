import * as React from 'react';
import { UserItem } from '../../styles/ContainerStyles';

interface UserSingleProps {
	user: {
		name: string;
		email: string;
		active: boolean;
	};
}

class UserSingle extends React.Component<UserSingleProps, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const user = this.props.user;
		return (
			<React.Fragment>
				<UserItem>
					<p>{user.name}</p>
					<p>{user.email}</p>
					<p>{user.active ? 'active' : 'pending'}</p>
				</UserItem>
			</React.Fragment>
		);
	}
}

export default UserSingle;
