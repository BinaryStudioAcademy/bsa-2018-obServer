import styled from 'styled-components';
import { media } from './styles-utils';

export const ChartsPageWrapper = styled.div`
	padding: 60px;
	margin: auto;
	min-height: 100%;
	background-color: #eef3f6;
`;

export const ChartWrapper = styled.div`
	background-color: #fff;
	margin: 10px;
	padding: 10px 20px;
	border-radius: 0.25rem;
	border: 1px solid #e5e9ec;
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

/*
export const ChartHeader = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	height: 60px;
`;

export const ChartTimeRange = styled.div`
	text-align: right;
	color: grey;
	line-height: 60px;
`;

export const ChartGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 40px;
	${media.desktop`grid-template-columns: 1fr;`};
`;
*/

export const ChartGridTwo = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 40px;
	${media.desktop`grid-template-columns: 1fr;`};
`;
