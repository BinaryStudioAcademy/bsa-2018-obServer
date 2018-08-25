import { injectGlobal } from 'styled-components';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
    html {
        height: 100%;
        width: 100%;
    }

    body {
        margin: 0;
        height: 100vh;
        background-color: rgba(255,255,255,0.8);
        color: #3d3d3d;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
