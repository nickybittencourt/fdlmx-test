import React from 'react';

type Props = {
  title?: string;
  content: string;
  mandatory?: boolean;
  hasSubTitle?: boolean;
};

const QuestionContent = ({ title, content, mandatory, hasSubTitle }: Props) => {
  return (
    <>
      {title && <label className='font-semibold text-2xl mb-2'>{title}</label>}
      <p>
        <label className={`${hasSubTitle ? 'text-sm text-gray-700' : ''}`}>
          {content}
          {!mandatory && (
            <span className='text-sm font-medium text-gray-500'>
              {' '}
              (opcional)
            </span>
          )}
        </label>
      </p>
    </>
  );
};

export default QuestionContent;
