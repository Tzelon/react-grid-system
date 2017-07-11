var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  & {\n    cursor: pointer;\n    position: relative;\n  }\n'], ['\n  & {\n    cursor: pointer;\n    position: relative;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  & {\n    display: flex;\n    justify-content: space-between;\n    cursor: pointer;\n    position: relative;\n    list-style: none;\n    background-color: #ccccee;\n    width: 150px;\n    padding: 10px 25px;\n\n    :hover {\n      background-color: grey;\n    }\n  }\n'], ['\n  & {\n    display: flex;\n    justify-content: space-between;\n    cursor: pointer;\n    position: relative;\n    list-style: none;\n    background-color: #ccccee;\n    width: 150px;\n    padding: 10px 25px;\n\n    :hover {\n      background-color: grey;\n    }\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  & {\n    display: none;\n    cursor: pointer;\n    position: fixed;\n    z-index: 255;\n    margin: 0;\n    padding: 0;\n  }\n    \n  ', '\n'], ['\n  & {\n    display: none;\n    cursor: pointer;\n    position: fixed;\n    z-index: 255;\n    margin: 0;\n    padding: 0;\n  }\n    \n  ', '\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  & {\n    display: block;\n  }\n'], ['\n  & {\n    display: block;\n  }\n']);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DotsHorizontal } from './icons';

import styled, { css } from 'styled-components';
//language=SCSS
var Container = styled('div')(_templateObject);

//language=SCSS
export var ListItem = styled('li')(_templateObject2);

//language=SCSS
var ListContainer = styled('ul')(_templateObject3, function (props) {
    return props.show && css(_templateObject4);
});

var DropdownMenu = function (_Component) {
    _inherits(DropdownMenu, _Component);

    function DropdownMenu() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DropdownMenu);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isOpen: false
        }, _this.handleChange = function (_ref2) {
            var _ref2$props = _ref2.props,
                name = _ref2$props.name,
                value = _ref2$props.value;

            _this.props.itemClick({ name: name, value: value });
        }, _this.onToggleShow = function () {
            _this.setState({ isOpen: !_this.state.isOpen });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DropdownMenu, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                className = _props.className,
                handler = _props.handler,
                children = _props.children;

            return React.createElement(
                Container,
                { className: className, onClick: this.onToggleShow },
                handler ? React.createElement('handler', null) : React.createElement(DotsHorizontal, null),
                React.createElement(
                    ListContainer,
                    { show: this.state.isOpen },
                    React.Children.map(children, function (child) {
                        return React.cloneElement(child, {
                            onClick: function onClick() {
                                return _this2.handleChange(child);
                            }
                        });
                    })
                )
            );
        }
    }]);

    return DropdownMenu;
}(Component);

export default DropdownMenu;