import * as React from 'react';
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import Quickstart from '../Quickstart/Quickstart';
import Settings from '../Settings/Settings';
import Logs from '../Logs/Logs';
import Profile from '../Profile/Profile';
import HttpStats from './HttpBlock';
import SocketStats from '../SocketStats/SocketStats';
import Company from '../Company/Company';
import { UserState } from '../../types/UserState';
import { userLogout, fetchUser } from 'src/redux/user/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DashboardMain, DashboardNav, DashboardWrapper, Select as StyledSelect, OptionActive, Option, RowContainer, CenteredContainer, Title } from './DashboardStyles';
import {
	Profile as UserProfile,
} from '../../styles/Styles';
import Select from 'src/components/Select/Select';
import { Dropdown } from '../../components/Select/SelectStyles';
import { ArrowDropDown } from 'styled-icons/material';
import ResourcesBlock from './ResourcesBlock';
import Notifications from '../../components/Notifications/Notifications';

interface DashboardState {
	active?: string;
	popup?: boolean;
}

interface DashboardProps extends RouteComponentProps<{}, {}> {
	actions: { userLogout: Function; fetchUser: Function };
	user: UserState;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
	constructor(props: DashboardProps) {
		super(props);

		this.state = {
			active: '',
			popup: false
		};

		this.setActive = this.setActive.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	setActive(active) {
		this.setState({ active });
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	handleLogout() {
		this.props.actions.userLogout();
	}

	componentDidMount() {
		this.props.actions.fetchUser();
	}

	render() {
		const { match } = this.props;
		return (
            <DashboardWrapper>
                <DashboardNav>
                    <RowContainer>
                        <Title>obServer</Title>
						<CenteredContainer>
	                        <Select onActive={false} options={['app1', 'app2', 'app3']}/>
						</CenteredContainer>
                    </RowContainer>
					<RowContainer>
						<Notifications />
						<CenteredContainer>
							<StyledSelect popup={this.state.popup}>
								<OptionActive onClick={this.togglePopup}>
									{this.props.user.name}
									<ArrowDropDown size="20" />
								</OptionActive>
								{this.state.popup && (
									<Dropdown popup={this.state.popup}>
										<Option onClick={this.togglePopup}>
											<Link to="/dashboardnew">profile</Link>
										</Option>
										<Option onClick={this.togglePopup}>
											<Link to="/dashboardnew">here</Link>
										</Option>
										<Option onClick={this.togglePopup}>
											<Link to="/dashboardnew">and here</Link>
										</Option>
									</Dropdown>
								)}
							</StyledSelect>
						</CenteredContainer>
					</RowContainer>
					
                </DashboardNav>
                <DashboardMain>
                    <ResourcesBlock />
                    <HttpStats />
                    <div>logs</div>
                </DashboardMain>

            </DashboardWrapper>
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

const DashboardConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);

export default DashboardConnected;
