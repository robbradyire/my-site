import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BingoTable from './BingoTable';
import NumberInput from './NumberInput';
import { atLeast, atMost } from '../../utils/validation';
import { generateNumbers } from '../../utils/random';

const DEFAULT_SIZE = 5;
const DEFAULT_CEILING = 75;
const MAX_SIZE = 31;
const MAX_CEILING = 999;

const Button = styled.button`
  margin-top: 12px;
`;

const StyledNumberInput = styled(NumberInput)`
  margin-top: 12px;
`;

const Bingo: React.FC = () => {
  const [key, setKey] = useState(0);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [ceiling, setCeiling] = useState(DEFAULT_CEILING);
  const [numbers, setNumbers] = useState(generateNumbers(size, ceiling));
  const [checkedNumbers, setCheckedNumbers] = useState<Record<number, boolean>>(
    {}
  );

  const generateNewSheet = () => {
    setNumbers(generateNumbers(size, ceiling));
    setCheckedNumbers({});
  };

  useEffect(generateNewSheet, [size, ceiling]);

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

  const handleResetDefaults = () => {
    setSize(DEFAULT_SIZE);
    setCeiling(DEFAULT_CEILING);
    setKey(key + 1); // forces reset of input field values
  };

  const maxSizeForCeiling = Math.floor(Math.sqrt(ceiling));
  const maxSizeValidators = [
    atMost(MAX_SIZE, `Only grids up to ${MAX_SIZE}x${MAX_SIZE} are permitted.`),
    atMost(
      maxSizeForCeiling,
      `Because the max bingo number is ${ceiling}, the max grid size is ${maxSizeForCeiling}x${maxSizeForCeiling}.`
    ),
  ];

  const sizeSquared = size * size;
  const minCeilingValidator = atLeast(
    sizeSquared,
    `Because the sheet size is ${size}x${size}, the max bingo number must be at least ${sizeSquared}.`
  );
  const maxCeilingValidator = atMost(
    MAX_CEILING,
    `The bingo numbers can only go up to ${MAX_CEILING} at most.`
  );

  return (
    <React.Fragment>
      <BingoTable
        handleClickCell={handleClickCell}
        isChecked={isChecked}
        numbers={numbers}
      />
      <StyledNumberInput
        defaultValue={size}
        handleChangeValue={setSize}
        key={key}
        label="Sheet size"
        maxLength={2}
        validators={maxSizeValidators}
      />
      <StyledNumberInput
        defaultValue={ceiling}
        handleChangeValue={setCeiling}
        key={key + 2}
        label="Max bingo number"
        maxLength={3}
        validators={[minCeilingValidator, maxCeilingValidator]}
      />
      <Button onClick={generateNewSheet}>New sheet</Button>
      <Button onClick={handleResetDefaults}>Reset defaults</Button>
    </React.Fragment>
  );
};

export default Bingo;
