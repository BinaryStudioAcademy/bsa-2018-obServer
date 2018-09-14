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
import { Title } from '../../styles/Styles';

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

export const RefreshButton = styled.button`
	margin-left: 10px;
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
	Title,
	Grid,
	SelectChartPage
};
