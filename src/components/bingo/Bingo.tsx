import React, { useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const CEILING = 75;
const SQUARE_LENGTH = 5;

const getCellIndex = (row: number, column: number) =>
  row * SQUARE_LENGTH + column;

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

const Bingo: React.FC = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [checkedNumbers, setCheckedNumbers] = useState<Record<number, boolean>>(
    {}
  );

  const handleClickNewSheet = () => {
    setNumbers(generateNumbers());
    setCheckedNumbers({});
  };

  const getHandleClickCell = (row: number, column: number) => () =>
    setCheckedNumbers(() => {
      const cellIndex = getCellIndex(row, column);
      return {
        ...checkedNumbers,
        [cellIndex]: !checkedNumbers[cellIndex],
      };
    });

  return (
    <React.Fragment>
      <StyledTable>
        <tbody>
          {getChunks(numbers).map((chunk, row) => (
            <tr key={row}>
              {chunk.map((cell, column) => (
                <Cell
                  key={column}
                  struck={checkedNumbers[getCellIndex(row, column)]}
                  onClick={getHandleClickCell(row, column)}
                >
                  {cell}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Button onClick={handleClickNewSheet}>New sheet</Button>
    </React.Fragment>
  );
};

export default Bingo;
