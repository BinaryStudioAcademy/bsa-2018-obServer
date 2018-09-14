import styled from 'styled-components';
import { media } from './styles-utils';

export const ChartWrapper = styled.div`
	height: 36vh;
	background-color: #fff;
	margin: 10px 20px 20px 0;
	padding: 10px 10px;
	border-radius: 0.25rem;
	border: 1px solid #e5e9ec;
`;

export const ChartHeader = styled.div`
	display: flex;
	justify-content: space-around;
`;

export const LogsSearchForm = styled.form`
	display: flex;
	justify-content: space-around;
	width: 98%;
	margin: 0;
	margin-right: 0;
	${media.desktop`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `};
`;

export const LogsList = styled.ul`
	width: 96%;
	height: 40vh;
	padding: 2%;
	border-radius: 5px;
	color: #c5c8c6;
	background-color: rgb(29, 31, 39);
	font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
		monospace;
	overflow-y: auto;
`;
