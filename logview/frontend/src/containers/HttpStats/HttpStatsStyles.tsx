import { CommentText, UserText } from '../../styles/TextStyles';
import { Chart, ChartInfo } from '../../styles/ChartStyles';
import styled from 'styled-components';
import {
	ChartHeader,
	ChartGridTwo as Grid,
	ChartWrapper,
	ChartsPageWrapper,
	ChartTimeRange,
	UserBar,
	SelectChartPage
} from '../../styles/Styles';
import { Title as TextTitle } from '../../styles/Styles';
import { Refresh } from 'styled-icons/material/Refresh'
import { Submit } from '../PasswordReset/PasswordResetStyles';

export const ChartGrid = Grid.extend`
	margin-top: 100px;
`;

export const TableWrapper = styled.div`
	margin: auto;
	margin: 10px;
	background: white;
	border-radius: 0.25rem;
	display: flex;
`;

export const RefreshButton = Submit.extend`
	display: inline;
	margin: 0;
	margin-left: 10px;
`;

export const Title = TextTitle.extend`
	display: flex; 
	align-items: center;
	justify-content: center;
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
	Grid,
	SelectChartPage
};
