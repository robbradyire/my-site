import styled, { css } from 'styled-components';
import { Colour } from '../../theme/colour';

interface CellProps {
  struck?: boolean;
}

const Cell = styled.td<CellProps>`
  border: medium solid ${Colour.dark};
  cursor: pointer;
  padding: 8px;
  text-align: right;
  width: 2ch;
  ${(props) =>
    props.struck &&
    css`
      background-color: ${Colour.dark};
      color: ${Colour.beige};
    `}
`;

export default Cell;
