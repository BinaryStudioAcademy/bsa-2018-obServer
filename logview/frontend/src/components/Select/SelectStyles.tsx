import { colors } from '../../styles/styles-utils';
import { UserPopup } from '../../styles/ContainerStyles';
import { UserText, CommentText } from '../../styles/TextStyles';

export const Select = UserPopup.extend`
	width: 20%;
	position: absolute;
	border: 1px solid;
	z-index: 1;
`;

export const OptionActive = UserText.extend`
	margin: 0;
	border: none;
	padding: 12px 0;
`;

export const Option = CommentText.extend`
	border-bottom: none;
	border-top: 1px solid;

	&:hover {
		border-bottom: none;
		border-top: 1px solid transparent;
		border-radius: 5px;
		background: ${colors.violet};
		color: white;
	}
`;
