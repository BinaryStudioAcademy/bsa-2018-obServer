import { CommentText, UserText } from '../../styles/TextStyles';
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

export const ChartGrid = Grid.extend`
	margin-top: 100px;
`;

export const TimerWrapper = styled.div`
	margin: 0;
	margin-right: 10px;
	color: grey;
	border-bottom: 1px solid #afafaf;
	padding: 12px 0;
`;

export {
	CommentText,
	UserText,
	Chart,
	ChartInfo,
	ChartHeader,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	UserBar,
	Title
};
