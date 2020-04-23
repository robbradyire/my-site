import styled, { css } from 'styled-components';
import { Colour } from '../../theme/colour';

interface CellProps {
  checked: boolean;
}

const Cell = styled.td<CellProps>`
  border: medium solid ${Colour.dark};
  cursor: pointer;
  padding: 8px;
  text-align: right;
  width: 2ch;
  ${(props) =>
    props.checked &&
    css`
      background-color: ${Colour.dark};
      color: ${Colour.beige};
    `}
`;

Cell.defaultProps = {
  checked: false,
};

export default Cell;
