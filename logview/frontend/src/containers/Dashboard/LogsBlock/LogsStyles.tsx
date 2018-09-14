import styled from 'styled-components';
import { LogsList as LogsLists } from '../../../styles/LogsStyles';

export const LogsContainer = styled.div`
	grid-column-start: span 2;
	background: #efefef;
	padding: 10px 5px 30px;
`;

export const LogsList = LogsLists.extend`
	background: #3d3d3d;
	color: #efefef;
`;
