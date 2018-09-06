import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import onClickOutside from 'react-onclickoutside';
import { NotificationIcon } from '../../styles/Styles';
import {
	NotificationPopup,
	Wrapper,
	Timestamp,
	Message,
	Item
} from './NotificationsStyles';
import { getNewNotification } from 'src/redux/logs/actions';
import { NotificationState } from 'src/types/LogsState';
import { startChannel, stopChannel } from 'src/redux/sockets/actions';

interface NotificationsState {
	popup: boolean;
	initial: boolean;
	notifications: Array<NotificationState>;
}

interface NotificationsProps {
	actions: {
		getNewNotification: Function;
		startChannel: Function;
	};
	notifications: Array<NotificationState>;
	options: Array<string>;
}

class Notifications extends React.Component<
	NotificationsProps,
	NotificationsState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			popup: false,
			initial: false,
			notifications: []
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	componentDidMount() {
		this.props.actions.startChannel();
		if (this.state.initial) {
			this.setState({ notifications: this.props.notifications });
			this.setState({ initial: false });
		}
	}

	handleClickOutside(evt) {
		this.setState({ popup: false });
	}

	handleClick(e) {
		this.setState({ popup: !this.state.popup });
	}

	togglePopup() {
		this.setState({ popup: !this.state.popup });
	}

	render() {
		const { notifications } = this.state;
		return (
			<Wrapper>
				<NotificationIcon size="25" onClick={this.handleClick} />
				{notifications.length > 0 && notifications.length}
				<NotificationPopup
					unmountOnExit
					in={this.state.popup}
					timeout={1000}
				>
					{notifications.length > 0 ? (
						notifications.map((notif: any, index) => {
							<Item key={index}>
								<Timestamp>{notif.timestamp}</Timestamp>
								<Message>{notif.message}</Message>
							</Item>;
						})
					) : (
						<Item>
							<Timestamp>now</Timestamp>
							<Message>Relax, everything's alright</Message>
						</Item>
					)}
				</NotificationPopup>
			</Wrapper>
		);
	}
}

const mapStateToProps = ({ notificationsLogs }) => ({
	notificationsLogs
});

const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators({ getNewNotification, startChannel }, dispatch)
});

const NotificationsConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Notifications);

export default onClickOutside(NotificationsConnected);
