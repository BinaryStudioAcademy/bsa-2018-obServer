import * as React from 'react';
import { UserItem } from './CompanyStyles';
import { UserIcon, AdminIcon, IconContainer, ActiveStatusIcon } from './UserSingleStyles';
import { RowContainer } from '../Dashboard/DashboardStyles';

interface UserSingleProps {
	user: {
		name: string;
		email: string;
		active: boolean;
		admin: boolean;
	};
}

class UserSingle extends React.Component<UserSingleProps, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { user }= this.props;
		return (
			<UserItem>
				<IconContainer>{ this.props.user.admin ?  <AdminIcon size="20" /> : <UserIcon size="20" /> }</IconContainer>
				<p>{user.name}</p>
				<p>{user.email}</p>
				<RowContainer>
					<IconContainer><ActiveStatusIcon size="10" active={user.active} /></IconContainer>
					<div>{user.active ? 'active' : 'pending'}</div>
				</RowContainer>
			</UserItem>
		);
	}
}

export default UserSingle;
