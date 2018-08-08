import styled from 'styled-components';
import * as React from 'react';

export const Title = styled.h2``;

export const TextLink = styled.p`
	cursor: pointer;
	border-bottom: 3px solid transparent;
	text-align: center;
	transition-duration: 0.3s ease;

	a {
		text-decoration: none;
		color: rgba(127, 120, 206, 1);
		border: 3px solid rgba(127, 120, 206, 1);
		/* border-image: linear-gradient(to right, rgba(127,120,206,1) , rgba(124,184,252,1)); */
		border-image-slice: 1;
		border-radius: 15px;
		padding: 10px 67px;
		font-size: 16px;
	}
`;
