import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root{
    --font-logo: 'Syne', sans-serif;
	--font-header: 'Roboto', sans-serif;
	--font-body: 'Roboto Mono', monospace;
	--color-primary-orange: #ed9a34;
	--color-primary-blue: #5370a3;
	--color-bg-element: rgba(255, 255, 255, 0.45);
	/* --font-logo: 'Chonburi', cursive; */
}

//CSS RESET
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

//my own globalstyles

a{
	color: var(--color-primary-orange);
	cursor: pointer;
	font-family: var(--font-body);
	font-size: 14px;
}

span{
	font-family: 'Roboto Mono', monospace;
	color: gray;
	font-size: 14px;
}

p{
	font-family: 'Roboto Mono', monospace;
	color: gray;
	font-size: 14px;
}

button{
	font-family: var(--font-header);
	font-weight: 400;
	font-size: 14px;
	width: 100px;
	height: 37.5px;
	border: 1px solid var(--color-primary-orange);
	color: var(--color-primary-orange);
	background: none;
	transition: background-color 500ms;
	transition-timing-function: ease;
	border-radius: 16px;
	cursor: pointer;

&:hover {
    background-color: rgba(252,210,70,.35);
    transition: background-color 500ms;
    transition-timing-function: ease;
}
}
`;