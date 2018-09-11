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
	border-bottom: 1px solid #d8dbdc;
	margin-right: 10px;
`;

export const ChartGrid = styled.div``;

export const Chart = styled.div`
	padding: 10px;
	margin: 10px;
	background-color: #fff;
	border-radius: 5px;
	flex: 3;
`;

export const ChartInfo = styled.div`
	flex: 1;
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	margin: 10px;
	grid-gap: 10px;
`;

export const ChartGridTwo = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 40px;
	${media.desktop`grid-template-columns: 1fr;`};
`;

export const SelectChartPage = styled.select`
	width: 170px;
	padding: 5px 35px 5px 10px;
	font-size: 16px;
	border: none;
	height: 34px;
	margin: 2px;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background: url(https://static.thenounproject.com/png/72961-200.png) 96% /
		15% no-repeat #eee;

	&::-ms-expand {
		display: none;
	}

	&:focus {
		outline-style: none;
	}

	@media screen and (min-width: 0\0) {
		background: none\9;
		padding: 5px\9;
	}
`;
