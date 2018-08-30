import styled from 'styled-components';
import { media, colors } from './styles-utils';

export const ChartsPageWrapper = styled.div`
	padding: 60px;
	margin: auto;
	min-height: 100%;
	background-color: #efefef;
`;

export const ChartWrapper = styled.div`
	margin: 10px;
	border-radius: 0.25rem;
	display: flex;
`;

export const ChartHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const ChartTimeRange = styled.div`
	text-align: right;
	color: grey;
	line-height: 60px;
	border-bottom: 1px solid #d8dbdc;
	margin-right: 10px;
`;

export const ChartGrid = styled.div``;

export const Chart = styled.div`
	padding: 10px;
	margin: 10px;
	background-color: #fff;
	flex: 3;
`;

export const ChartInfo = styled.div`
	flex: 1;
	display: grid;
	grid-template-rows: repeat(3, 1fr);
	margin: 10px;
	grid-gap: 10px;

	div {
		background: white;
	}
`;
