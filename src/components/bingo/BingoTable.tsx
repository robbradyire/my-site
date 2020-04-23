import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const StyledTable = styled.table`
  border: medium solid black;
`;

interface BingoTableProps {
  handleClickCell: (row: number, column: number) => void;
  isChecked: (row: number, column: number) => boolean;
  numbers: number[];
  size: number;
}

const getChunks = (array: any[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const BingoTable: React.FC<BingoTableProps> = ({
  handleClickCell,
  isChecked,
  size,
  numbers,
}) => {
  return (
    <StyledTable>
      <tbody>
        {getChunks(numbers, size).map((chunk, row) => (
          <tr key={row}>
            {chunk.map((cell, column) => (
              <Cell
                key={column}
                checked={isChecked(row, column)}
                onClick={() => handleClickCell(row, column)}
              >
                {cell}
              </Cell>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default BingoTable;
