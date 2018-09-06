import * as React from 'react';
import {
	CenteredContainer,
	OptionActive,
	Dropdown,
	Option,
	Select
} from './DashboardStyles';
import { ArrowDropDown } from 'styled-icons/material';
import { Link, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLogout, fetchUser } from 'src/redux/user/actions';
import { UserState } from '../../types/UserState';
import onClickOutside from 'react-onclickoutside';

interface ProfileState {
	active?: string;
	popup?: boolean;
}

interface ProfileProps extends RouteComponentProps<{}, {}> {
	actions: { userLogout: Function; fetchUser: Function };
	user: UserState;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
	constructor(props: any) {
		super(props);

		this.state = {
			active: '',
			popup: false
		};

		this.togglePopup = this.togglePopup.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	handleLogout() {
		this.props.actions.userLogout();
	}

	handleClickOutside(evt) {
		this.setState({ popup: false });
	}

	componentDidMount() {
		this.props.actions.fetchUser();
	}

	render() {
		return (
			<CenteredContainer>
				<Select popup={this.state.popup}>
					<OptionActive onClick={this.togglePopup}>
						{this.props.user.name}
						<ArrowDropDown size="20" />
					</OptionActive>
					{this.state.popup && (
						<Dropdown popup={this.state.popup}>
							<Option onClick={this.togglePopup}>
								<Link to="/dashboard/company">company</Link>
							</Option>
							<Option onClick={this.togglePopup}>
								<Link to="/dashboard/quickstart">help</Link>
							</Option>
							<Option onClick={this.handleLogout}>
								<span>logout</span>
							</Option>
						</Dropdown>
					)}
				</Select>
			</CenteredContainer>
		);
	}
}

const mapStateToProps = ({ fetchingUserStatus, user }) => ({
	fetchingUserStatus,
	user
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ userLogout, fetchUser }, dispatch)
});

const ProfileOutside = onClickOutside(Profile);
const ProfileConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileOutside);

export default ProfileConnected;
