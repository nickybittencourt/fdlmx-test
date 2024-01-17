import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Question } from '@/types/surveyTypes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSubmits = (formData: FormData, questionList: Question[]) => {
  const answers = questionList.map((question, index) => {
    const answer =
      question.typeQuestion === 6
        ? formData.getAll(String(index)).join(', ')
        : formData.get(String(index)) as string;
    if (
      (question.mandatory && Array.isArray(answer) && answer.length === 0) ||
      (question.mandatory && !answer)
    )
      throw new Error('Pergunta obrigatória não respondida!');
    
    if (answer) return { ...question, answerValue: answer };
    
    return question;
  });

  return answers;
};
