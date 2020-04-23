import React, { useState } from 'react';
import styled from 'styled-components';
import BingoTable from './BingoTable';

const generateNumbers = (size: number, ceiling: number) =>
  Array(size * size)
    .fill(0)
    .map(() => Math.floor(Math.random() * ceiling + 1));

const Button = styled.button`
  margin-top: 12px;
`;

const Bingo: React.FC = () => {
  const size = 5;
  const ceiling = 75;
  const [numbers, setNumbers] = useState(generateNumbers(size, ceiling));
  const [checkedNumbers, setCheckedNumbers] = useState<Record<number, boolean>>(
    {}
  );

  const getIndex = (row: number, column: number) => row * size + column;

  const handleClickCell = (row: number, column: number) => {
    const index = getIndex(row, column);
    setCheckedNumbers({
      ...checkedNumbers,
      [index]: !checkedNumbers[index],
    });
  };

  const handleClickNewSheet = () => {
    setNumbers(generateNumbers(size, ceiling));
    setCheckedNumbers({});
  };

  return (
    <React.Fragment>
      <BingoTable
        handleClickCell={handleClickCell}
        isChecked={(row, column) => checkedNumbers[getIndex(row, column)]}
        numbers={numbers}
        size={size}
      />
      <Button onClick={handleClickNewSheet}>New sheet</Button>
    </React.Fragment>
  );
};

export default Bingo;
