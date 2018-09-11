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

export const ChartHeader = styled.h3`
	text-align: center;
`;

export const LogsSearchForm = styled.form`
	display: flex;
	justify-content: space-between;
	width: 98%;
	margin: 0;
	margin-right: 0;
	${media.desktop`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `};
`;

export const LevelPicker = styled.div`
	width: 40%;
	height: 40px;
	background-color: #ddd;
	border-radius: 5px;
	border: 1px solid grey;
	padding: 0 0 0 1vw;
	color: #555;
	font-weight: bold;
	font-size: 13.3333px;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
	:hover {
		background-color: #aaa;
	}
	:hover span {
		display: none;
	}
	:hover label {
		display: block;
		width: 30%;
	}
	${media.desktop`
        width: 90%;
        margin-right: 0;
        margin-bottom: 3%;
    `};
`;

export const Level = styled.label`
	display: none;
`;

export const TimeSpanPicker = styled.select`
	width: 40%;
	height: 40px;
	border-radius: 5px;
	color: #555;
	font-weight: bold;
	:hover {
		background-color: #ddd;
	}
    ${media.desktop`
		width: 92%;
		margin-right: 0;
		margin-bottom: 3%;
	`};
`;

export const SearchButton = styled.button`
	width: 16%;
	height: 40px;
	border-radius: 5px;
	background-color: #ddd;
	color: #555;
	font-weight: bold;
	:hover {
		background-color: #aaa;
	}
	${media.desktop`
        width: 92%;
        margin-left: 0;
        margin-bottom: 3%;
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

export const LogItem = styled.li`
	margin: 1%;
	display: flex;
	flex-flow: row nowrap;
	${media.tablet`
        display: flex;
        flex-flow: column nowrap;
        margin: 3% 0;
    `};
`;

export const LogDate = styled.p`
	width: 25%;
	margin: 0 3% 0 0;
	color: #ffc8c6;
	${media.tablet`
        width: 100%;
        margin: 0;
    `};
`;

const LogLabel = styled.p`
	width: 10%;
	margin: 0 3% 0 0;
	font-weight: bold;
	${media.tablet`
        width: 100%;
        margin: 0;
    `};
`;

export const LogText = styled.p`
	width: 50%;
	margin: 0;
	color: #c5c8c6;
	${media.tablet`
        width: 100%;
        margin: 0;
    `};
`;

export const NotFound = styled.li`
	color: #fff;
	list-style: none;
	${media.tablet`
        width: 100%;
    `};
`;

export const ErrorLabel = styled(LogLabel)`
	color: red;
`;

export const WarnLabel = styled(LogLabel)`
	color: orange;
`;

export const InfoLabel = styled(LogLabel)`
	color: lightgreen;
`;

export const VerboseLabel = styled(LogLabel)`
	color: lightskyblue;
`;

export const DebugLabel = styled(LogLabel)`
	color: white;
`;

export const SillyLabel = styled(LogLabel)`
	color: grey;
`;
