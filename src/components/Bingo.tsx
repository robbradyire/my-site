import React, { useState } from 'react';
import styled from 'styled-components';

const CEILING = 75;
const SQUARE_LENGTH = 5;

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

const Cell = styled.td`
  border: medium solid black;
  padding: 8px;
  text-align: right;
  width: 2ch;
`;

const Bingo: React.FC = () => {
  const [numbers, setNumbers] = useState(generateNumbers());
  const handleClickNewSheet = () => setNumbers(generateNumbers());

  return (
    <div>
      <StyledTable>
        <tbody>
          {getChunks(numbers).map((line, i) => (
            <tr key={i}>
              {line.map((n, j) => (
                <Cell key={j}>{n}</Cell>
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
