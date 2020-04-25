import React, { useState } from 'react';
import styled from 'styled-components';
import BingoTable from './BingoTable';
import NumberInput from './NumberInput';

const generateNumbers = (size: number, ceiling: number) =>
  Array(size * size)
    .fill(0)
    .map(() => Math.floor(Math.random() * ceiling + 1));

const Button = styled.button`
  margin-top: 12px;
`;

const Input = styled(NumberInput)`
  margin-top: 12px;
  max-width: 3ch;
`;

const Bingo: React.FC = () => {
  const [size, setSize] = useState(5);
  const [ceiling, setCeiling] = useState(75);
  const [numbers, setNumbers] = useState(generateNumbers(size, ceiling));
  const [checkedNumbers, setCheckedNumbers] = useState<Record<number, boolean>>(
    {}
  );

  const getIndex = (row: number, column: number) => row * size + column;
  const isChecked = (row: number, column: number) =>
    checkedNumbers[getIndex(row, column)];

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

  const handleChangeSize = (newSize: number) => {
    setSize(newSize);
    setNumbers(generateNumbers(newSize, ceiling));
    setCheckedNumbers({});
  };

  const handleChangeCeiling = (newCeiling: number) => {
    setCeiling(newCeiling);
    setNumbers(generateNumbers(size, newCeiling));
    setCheckedNumbers({});
  };

  return (
    <React.Fragment>
      <BingoTable
        handleClickCell={handleClickCell}
        isChecked={isChecked}
        numbers={numbers}
        size={size}
      />
      <Input
        defaultValue={5}
        handleChangeValue={handleChangeSize}
        text="Sheet size:"
      />
      <Input
        defaultValue={75}
        handleChangeValue={handleChangeCeiling}
        text="Max bingo number:"
      />
      <Button onClick={handleClickNewSheet}>New sheet</Button>
    </React.Fragment>
  );
};

export default Bingo;
