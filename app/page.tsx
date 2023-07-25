'use client'

import { useEffect, useReducer } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { generateDigitsOfPi } from '@/util/math';

export default function Home() {
  const [pi, dispatch] = useReducer((state : any, action : any) => {
    if (action.type === 'ADD_DIGITS') {
      return state + action.payload;
    }
    return state;
  }, '');

  useEffect(() => {
    const iter = generateDigitsOfPi();

    function displayTenNextDigits() {
      let digits = '';
      for (let i = 0; i < 10; i++) digits += iter.next().value;
      dispatch({ type: 'ADD_DIGITS', payload: digits });
      requestAnimationFrame(displayTenNextDigits);
    }

    displayTenNextDigits();
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className='flex flex-col h-full w-full items-center justify-center'>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-9xl rainbow font-bold">π</h1>
            <h1 className="font-semibold text-3xl">The Magic Number</h1>
            <h2 className="text-lg font-semibold">3.14159265359 . . .</h2>
          </div>  
        </div>
        <div className='self-center rainbow'>
          <FaChevronDown className='mb-16 text-3xl float' />
        </div>
      </div>
      <div className='break-all font-semibold'>
        {pi}
      </div>
    </>
  );
}
