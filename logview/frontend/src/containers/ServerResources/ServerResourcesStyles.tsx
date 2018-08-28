import { CommentText, UserText } from '../../styles/TextStyles';
import { UserPopup } from '../../styles/ContainerStyles';
import { Chart, ChartInfo } from '../../styles/ChartStyles';
import {
	ChartHeader,
	ChartGrid as Grid,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	UserBar
} from '../../styles/Styles';
import { Title } from '../../styles/Styles';
import styled from 'styled-components';
import { colors } from '../../styles/styles-utils';

export const Select = UserPopup.extend`
    width: 20%;
    position: absolute;
    border: 1px solid;
`;

export const ChartGrid = Grid.extend`
    margin-top: 100px;
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

export { CommentText, UserText, Chart, ChartInfo, ChartHeader,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	UserBar, Title }