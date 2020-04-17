import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Colour } from '../theme/colour';

const CEILING = 75;
const SQUARE_LENGTH = 5;

const getCellIndex = (i: number, j: number) => i * SQUARE_LENGTH + j;

const generateNumbers = () =>
  Array(SQUARE_LENGTH * SQUARE_LENGTH)
    .fill(0)
    .map(() => Math.floor(Math.random() * CEILING + 1));

const getChunks = (array: any[]) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += SQUARE_LENGTH) {
    chunks.push(array.slice(i, i + SQUARE_LENGTH));
  }
  return chunks;
};

const Button = styled.button`
  margin-top: 12px;
`;

const StyledTable = styled.table`
  border: medium solid black;
`;

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

const Bingo: React.FC = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [checkedNumbers, setCheckedNumbers] = useState<Record<number, boolean>>(
    {}
  );

  const handleClickNewSheet = () => {
    setNumbers(generateNumbers());
    setCheckedNumbers({});
  };

  const getHandleClickCell = (i: number, j: number) => () =>
    setCheckedNumbers(() => {
      const cellIndex = getCellIndex(i, j);
      return {
        ...checkedNumbers,
        [cellIndex]: !checkedNumbers[cellIndex],
      };
    });

  return (
    <div>
      <StyledTable>
        <tbody>
          {getChunks(numbers).map((line, i) => (
            <tr key={i}>
              {line.map((n, j) => (
                <Cell
                  key={j}
                  struck={checkedNumbers[getCellIndex(i, j)]}
                  onClick={getHandleClickCell(i, j)}
                >
                  {n}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Button onClick={handleClickNewSheet}>New sheet</Button>
    </div>
  );
};

export default Bingo;
