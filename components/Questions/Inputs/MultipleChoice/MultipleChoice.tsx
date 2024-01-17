import React from 'react';

import { Item } from '@/types/surveyTypes';

type Props = {
  itens?: Item[];
  horizontal?: boolean;
  answerValue?: number[] | string[];
  questionIndex: number;
  required?: boolean;
};

const MultipleChoice = ({
  itens,
  horizontal,
  answerValue,
  questionIndex,
  required,
}: Props) => {
  return (
    <>
      {horizontal ? (
        <>
          {itens?.map((item, index) => (
            <label
              key={index}
              className='border rounded-full border-gray-300 py-2 px-4 hover:border-green-700 has-[:checked]:border-green-700'
            >
              <input
                type='checkbox'
                name={`${questionIndex}`}
                value={item.value}
                className='hidden'
                // defaultChecked={answerValue?.includes(item.value)}
              />
              {item.description}
            </label>
          ))}
        </>
      ) : (
        <div>
          {itens?.map((item, index) => (
            <div key={index} className='flex gap-2 mb-3	'>
              <input
                type='checkbox'
                name={`${questionIndex}`}
                value={item.value}
                // defaultChecked={answerValue?.includes(item.value)}
              />
              <label>{item.description}</label>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MultipleChoice;
