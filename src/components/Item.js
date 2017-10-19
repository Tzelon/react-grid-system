
import styled from 'styled-components';
//language=SCSS
const Item = styled('div')`
  & {
    display: flex;
    background-color: blueviolet;
    
    :hover {
      background-color: brown;
    }
  }
`;

export default Item;
