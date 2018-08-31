import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import { NotificationIcon } from '../../styles/Styles';
import { NotificationPopup, Wrapper, Timestamp, Message, Item } from './NotificationsStyles';

interface NotificationsState {
	popup: boolean;
}

interface NotificationsProps {
	options: Array<string>;
}

class Notifications extends React.Component<NotificationsProps, NotificationsState> {
	constructor(props: any) {
		super(props);

		this.state = {
			popup: false
		};

		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.togglePopup = this.togglePopup.bind(this);
	}

	componentDidMount() {

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
		return (
            <Wrapper>
			    <NotificationIcon size="20" onClick={this.handleClick}/>
                <NotificationPopup unmountOnExit in={this.state.popup} timeout={1000}>
                        <Item>
                            <Timestamp>18/08/2018, 09:48:14</Timestamp>
                            <Message>Server down</Message>
                        </Item>
                        <Item>
                            <Timestamp>21/08/2018, 15:34:54</Timestamp>
                            <Message>CPU Critically High Load</Message>
                        </Item>
                        <Item>
                            <Timestamp>20/08/2018, 20:08:14</Timestamp>
                            <Message>-> Relax, we're doing fine</Message>
                        </Item>
                </NotificationPopup>
            </Wrapper>
		);
	}
}

export default onClickOutside(Notifications);
