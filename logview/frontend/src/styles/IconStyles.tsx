import { Notifications } from 'styled-icons/material';

export const NotificationIcon = Notifications.extend`
	padding: 3px;
	margin: 10px;
	border-radius: 7px;
	color: #a0a0a0;
	border: 1.5px solid #a0a0a0;

	&:hover {
		color: #3d3d3d;
		border: 1.5px solid #3d3d3d;
	}
`;
