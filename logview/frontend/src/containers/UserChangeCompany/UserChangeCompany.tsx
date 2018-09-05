import * as React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userChangeCompany } from 'src/redux/company/actions';
import { Landing } from '../../styles/ContainerStyles';
import { Button, Logo, Title } from './UserChangeCompanyStyle';
const logo = require('src/assets/invite.png');

interface UserChangeCompanyProps {
	actions: {
		userChangeCompany: Function;
	};
}

interface UserChangeCompanyState {}

class UserChangeCompany extends React.Component<
	UserChangeCompanyProps,
	UserChangeCompanyState
> {
	componentDidMount() {
		this.props.actions.userChangeCompany();
	}

	render() {
		return (
			<Landing>
				<Logo>{logo}</Logo>
				<Title>You joined to companyName</Title>
				<Button>
					<Link to="/">Proceed to home</Link>
				</Button>
			</Landing>
		);
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userChangeCompany }, dispatch)
});

const UserChangeCompanyConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserChangeCompany);

export default UserChangeCompanyConnected;

export default UserChangeCompany;
