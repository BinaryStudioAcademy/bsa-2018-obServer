import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import {
	NotificationPopup,
	Wrapper,
	Timestamp,
	Message,
	Item,
	NotificationActive,
	NotificationIcon
} from './NotificationsStyles';
import { NotificationState } from '../../types/LogsState';
import { preetifyDate } from 'src/services/logstats/logs';

interface NotificationsState {
	popup: boolean;
	notifications: Array<any>;
}

interface NotificationsProps {
	options: Array<string>;
	data: Array<NotificationState>;
}

class Notifications extends React.Component<
	NotificationsProps,
	NotificationsState
> {
	constructor(props: any) {
		super(props);

		this.state = {
			popup: false,
			notifications: []
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
		this.parseNotification = this.parseNotification.bind(this);
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

	parseNotification(arr): Array<any> {
		const parsedData = arr.slice(1).reverse();
		parsedData.map(item => {
			const parsedDate = new Date(item.timestamp);
			item.timestamp = preetifyDate(parsedDate);
		});
		return parsedData;
	}

	render() {
		const notifications = this.parseNotification(this.props.data);
		return (
			<Wrapper>
				<Wrapper>
					<NotificationIcon size="25" onClick={this.handleClick} />
					{notifications &&
						notifications.length > 0 &&
						notifications.length && (
							<NotificationActive size="10" />
						)}
				</Wrapper>

				<NotificationPopup
					unmountOnExit
					in={this.state.popup}
					timeout={1000}
				>
					{notifications.length > 0 ? (
						notifications.map((notif, index) => (
							<Item key={index}>
								<Timestamp>{notif.timestamp}</Timestamp>
								<Message>{notif.message}</Message>
							</Item>
						))
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

export default onClickOutside(Notifications);
