var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _templateObject = _taggedTemplateLiteral(['\n         width: 24px; \n         height: 24px;\n    '], ['\n         width: 24px; \n         height: 24px;\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n  & {\n    width: 24px;\n    height: 24px;\n  }\n'], ['\n  & {\n    width: 24px;\n    height: 24px;\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * Created by tzelonm on 27/06/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

var wrapSvg = function wrapSvg(Component) {
    return function (props) {
        return _jsx('svg', {
            height: '24',
            width: '24',
            role: 'presentation',
            focusable: 'false',
            'aria-hidden': 'true'
        }, void 0, React.createElement(Component, props));
    };
};

export var Close = wrapSvg(styled('path')(_templateObject));

Close.defaultProps = {
    d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
    viewBox: "0 0 24 24",
    fill: "#ffffff"
};

//language=SCSS
export var DotsHorizontal = wrapSvg(styled('path')(_templateObject2));

DotsHorizontal.defaultProps = {
    d: "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z",
    viewBox: "0 0 24 24",
    fill: "#ffffff"
};

var _ref2 = _jsx('path', {
    d: 'M18 0H0v13h19V0h-1zM3 12H1v-2h2v2zm0-3H1V7h2v2zm0-3H1V4h2v2zm0-3H1V1h2v2zm3 9H4v-2h2v2zm0-3H4V7h2v2zm0-3H4V4h2v2zm0-3H4V1h2v2zm3 9H7v-2h2v2zm0-3H7V7h2v2zm0-3H7V4h2v2zm0-3H7V1h2v2zm3 9h-2v-2h2v2zm0-3h-2V7h2v2zm0-3h-2V4h2v2zm0-3h-2V1h2v2zm3 9h-2v-2h2v2zm0-3h-2V7h2v2zm0-3h-2V4h2v2zm0-3h-2V1h2v2zm3 9h-2v-2h2v2zm0-3h-2V7h2v2zm0-3h-2V4h2v2zm0-3h-2V1h2v2z'
});

/*   <rect width="7" height="7" ></rect>
 <rect width="13" height="7" ></rect>
 <rect width="7" height="13" ></rect>
 <rect width="13" height="13" ></rect>
 <rect width="19" height="13" ></rect>
 <rect width="13" height="19" ></rect>
 <rect width="19" height="19" ></rect>*/
export var Grid = function Grid(_ref) {
    var size = _ref.size;
    return _jsx('svg', {
        height: '24',
        width: '50',
        viewBox: '0 0 15 13',
        role: 'presentation',
        focusable: 'false',
        'aria-hidden': 'true',
        fill: '#ffffff'
    }, void 0, _jsx('g', {}, void 0, _ref2, _jsx('rect', {
        width: size[0] * 3 + 1,
        height: size[1] * 3 + 1
    })));
};