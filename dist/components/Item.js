var _templateObject = _taggedTemplateLiteral(['\n  & {\n    display: flex;\n    background-color: blueviolet;\n    \n    :hover {\n      background-color: brown;\n    }\n  }\n'], ['\n  & {\n    display: flex;\n    background-color: blueviolet;\n    \n    :hover {\n      background-color: brown;\n    }\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
//language=SCSS
var Item = styled('div')(_templateObject);

export default Item;