import styled from 'styled-components';
import { media } from './styles-utils';

export const ChartWrapper = styled.div`
	background-color: #fff;
	margin: 10px;
	padding: 10px 20px;
	border-radius: 0.25rem;
	border: 1px solid #e5e9ec;
`;

export const ChartHeader = styled.h3`
	text-align: center;
`;

export const LogsSearchForm = styled.form`
	display: flex;
	justify-content: space-between;
	width: 94%;
	margin-right: 0;
	${media.tablet`
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `};
`;

export const LevelPicker = styled.select`
	width: 15%;
	height: 40px;
	margin-right: 2%;
	${media.tablet`
        width: 92%;
        margin-right: 0;
        margin-bottom: 3%;
    `};
`;

export const DatePicker = styled.input`
	width: 16%;
	height: 30px;
	${media.tablet`
        width: 88%;
        margin-bottom: 3%;
    `};
`;

export const SearchButton = styled.button`
	width: 17%;
	height: 40px;
	margin-left: 2%;
	border-radius: 5px;
	background-color: #ddd;
	color: #555;
	font-weight: bold;
	:hover {
		background-color: #aaa;
	}
	${media.tablet`
        width: 92%;
        margin-left: 0;
        margin-bottom: 3%;
    `};
`;

export const LogsList = styled.ul`
	height: 80%;
	padding: 2%;
	border-radius: 5px;
	color: #c5c8c6;
	background-color: rgb(29, 31, 39);
	font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
		monospace;
	overflow-y: scroll;
	${media.tablet`
        height: auto%;
    `};
`;

export const LogItem = styled.li`
	margin: 1%;
	display: flex;
	flex-flow: row nowrap;
	${media.tablet`
        display: flex;
        flex-flow: column nowrap;
    `};
`;

export const LogDate = styled.p`
	width: 25%;
	margin: 0 3% 0 0;
	color: #c5c8c6;
	${media.tablet`
        width: 100%;
        margin: 3% 0;
    `};
`;

const LogLabel = styled.p`
	width: 10%;
	margin: 0 3% 0 0;
	font-weight: bold;
	${media.tablet`
        width: 100%;
        margin: 3% 0;
    `};
`;

export const LogText = styled.p`
	width: 50%;
	margin: 0;
	color: #c5c8c6;
	${media.tablet`
        width: 100%;
        margin: 3% 0;
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
