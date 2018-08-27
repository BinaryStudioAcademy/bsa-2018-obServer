import * as React from 'react';
import { fetchCompanyUsers } from 'src/redux/company/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface ProfileProps {
	onSubmit: Function;
	actions: { fetchCompanyUsers: Function };
}

interface ProfileState {}

class Profile extends React.Component<ProfileProps, ProfileState> {
	componentDidMount() {
		this.props.actions.fetchCompanyUsers();
	}
	render() {
		const user = sessionStorage.getItem('observerUser');
		return (
			<div>
				<h3>{user}</h3>
			</div>
		);
	}
}

const mapStateToProps = ({ fetching }) => ({
	fetching
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ fetchCompanyUsers }, dispatch)
});

const ProfileConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile);

export default ProfileConnected;
