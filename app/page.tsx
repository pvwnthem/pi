'use client'

import { useEffect, useReducer } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { generateDigitsOfPi } from '@/util/math';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [pi, dispatch] = useReducer((state : any, action : any) => {
    if (action.type === 'ADD_DIGIT') {
      return state + action.payload;
    }
    return state;
  }, '');

  useEffect(() => {
    const iter = generateDigitsOfPi();

    function displayNextDigit() {
      const digit = iter.next().value;
      dispatch({ type: 'ADD_DIGIT', payload: digit });
      requestAnimationFrame(displayNextDigit);
    }

    displayNextDigit();
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
          <button className='px-12 py-2 text-white rounded-lg mt-8 rainbow-bg' onClick={() => router.push('/memorize')}>memorize</button>
        </div>
        <div className='self-center rainbow'>
          <FaChevronDown className='mb-16 text-3xl float' />
        </div>
      </div>
      <h1 className='text-center font-semibold text-xl mb-4'>{pi.length} digits of pi</h1>
      <div className='break-all font-semibold'>
        {pi}
      </div>
    </>
  );
}