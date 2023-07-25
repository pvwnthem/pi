'use client'

import React, { useState, useEffect, useRef } from 'react';
import { generateDigitsOfPi } from '@/util/math';

const PiMemorizationGame: React.FC = () => {
  const [piDigits, setPiDigits] = useState<number[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const iter = generateDigitsOfPi();
    const newPiDigits = [];
    for (let i = 0; i < 100; i++) {
      newPiDigits.push(iter.next().value);
    }
    setPiDigits(newPiDigits as number[]);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [piDigits]);

  const handleInputChange = (index: number, value: string) => {
    if (!isGameOver) {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);

      if (index < piDigits.length - 1 && Number(value) === piDigits[index]) {
        inputRefs.current[index + 1]?.focus();
      }

      if (index === piDigits.length - 1 && Number(value) === piDigits[index]) {
        setIsGameOver(true);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pi Memorization Game</h1>
      <div className="flex items-center justify-center flex-wrap">
        {piDigits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
            type="text"
            value={inputValues[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            disabled={isGameOver}
            className={`w-12 h-12 border border-gray-400 px-2 text-center rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${
              Number(inputValues[index]) === piDigits[index]
                ? 'bg-green-100 text-green-600'
                : ' text-red-600'
            }`}
          />
        ))}
      </div>
      {isGameOver && (
        <div className="text-center mt-4">
          <p className="text-xl font-semibold">Congratulations! You memorized Pi!</p>
          <p className="text-lg mt-2">The first {piDigits.length} digits of Pi are:</p>
          <p className="text-2xl font-bold mt-2">{piDigits.join('')}</p>
        </div>
      )}
    </div>
  );
};

export default PiMemorizationGame;
