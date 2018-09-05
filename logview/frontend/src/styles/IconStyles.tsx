import { Notifications } from 'styled-icons/material';
import { Settings } from 'styled-icons/feather';

export const NotificationIcon = Notifications.extend`
	padding: 3px;
	margin: 0 10px;
	border-radius: 7px;
	color: #a0a0a0;

	&:hover {
		color: #3d3d3d;
	}
`;

export const SettingsIcon = Settings.extend`
	padding: 3px;
	margin: 0 10px;
	border-radius: 7px;
	color: #a0a0a0;

	&:hover {
		color: #3d3d3d;
	}
`;
