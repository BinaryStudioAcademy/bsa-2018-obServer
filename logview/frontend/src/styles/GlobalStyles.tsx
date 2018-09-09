import { injectGlobal } from 'styled-components';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    html {
        min-height: 100%;
        max-width: 100%;
    }

    body {
        margin: 0;
        background-color: rgba(255,255,255,0.8);
        color: #3d3d3d;
    }
`;
