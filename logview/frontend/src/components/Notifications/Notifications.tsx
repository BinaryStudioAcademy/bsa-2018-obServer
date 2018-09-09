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

interface NotificationsState {
	popup: boolean;
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
			popup: false
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
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
		const { data } = this.props;
		return (
			<Wrapper>
				<Wrapper>
					<NotificationIcon size="25" onClick={this.handleClick} />
					{data &&
						data.length > 0 &&
						data.length && <NotificationActive size="10" />}
				</Wrapper>

				<NotificationPopup
					unmountOnExit
					in={this.state.popup}
					timeout={1000}
				>
					{data.length > 0 ? (
						data.map((notif: any, index) => {
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

export default onClickOutside(Notifications);
