import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DotsHorizontal } from './icons';


import styled, { css } from 'styled-components';
//language=SCSS
const Container = styled('div')`
  & {
    cursor: pointer;
    position: relative;
  }
`;

//language=SCSS
export const ListItem = styled('li')`
  & {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    list-style: none;
    background-color: #ccccee;
    width: 150px;
    padding: 10px 25px;

    :hover {
      background-color: grey;
    }
  }
`;

//language=SCSS
const ListContainer = styled('ul')`
  & {
    display: none;
    cursor: pointer;
    position: fixed;
    z-index: 9999;
    margin: 0;
    padding: 0;
  }
    
  ${(props) => props.show && css`
  & {
    display: block;
  }
`}
`;

export default class DropdownMenu extends Component {
    static propTypes: {
        handler: PropTypes.element,
        children: PropTypes.object,
        itemClick: PropTypes.func,
        options: PropTypes.any.isRequired,
        active: PropTypes.any.isRequired,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string
    };

    state = {
        isOpen: false,
    };

    handleChange = ({props: {name, value}}) => {
       this.props.itemClick({name, value});
    };

    onToggleShow = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const { className, handler, children } = this.props;
        return (
            <Container className={className} onClick={this.onToggleShow} >
                {handler ? <handler/> : <DotsHorizontal/>}
                <ListContainer show={this.state.isOpen} >
                    {
                        React.Children.map(children, (child) => React.cloneElement(child, {
                            onClick: () => this.handleChange(child),
                        }))
                    }
                </ListContainer>
            </Container>
        );
    }
}
