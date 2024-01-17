import React from 'react';

import MultipleChoice from '@/components/Questions/Inputs/MultipleChoice/MultipleChoice';
import StarRating from '@/components/Questions/Inputs/StarRating/StarRating';
import QuestionContent from '@/components/Questions/QuestionContent';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { handleSubmits } from '@/lib/utils';
import {
  sendError,
  sendFakePost,
  sendSuccess,
} from '@/services/surveyFormService';
import { Question } from '@/types/surveyTypes';

type Props = {
  questionList: Question[];
};

const renderQuestionByType = (question: Question, questionIndex: number) => {
  switch (question.typeQuestion) {
    case 1:
      //Star Rating
      return (
        <>
          <QuestionContent
            content={question.content}
            title='Título da pergunta deve ficar aqui'
            mandatory={question.mandatory}
            hasSubTitle
          />
          <StarRating
            answerValue={question.answerValue}
            questionIndex={questionIndex}
            required={question.mandatory}
          />
        </>
      );
    case 2:
      //Radio Rating
      return (
        <>
          <QuestionContent
            content={question.content}
            title='Título da pergunta deve ficar aqui'
            mandatory={question.mandatory}
            hasSubTitle
          />
          <div className='flex justify-between mt-9	'>
            {[...Array(10)].map((_, index) => (
              <div
                key={index + 1}
                className='flex flex-col items-center gap-2 text-sm text-gray-700'
              >
                <input
                  type='radio'
                  name={`${questionIndex}`}
                  value={index + 1}
                  defaultChecked={index + 1 === question.answerValue}
                  required={question.mandatory}
                ></input>
                <label>{index + 1}</label>
              </div>
            ))}
          </div>
        </>
      );
    case 3:
      //Text Area
      return (
        <>
          <QuestionContent
            content={question.content}
            mandatory={question.mandatory}
          />
          <textarea
            className='border	rounded-lg border-gray-400 p-3 resize-none w-full h-[104px] mt-2'
            placeholder='Digite aqui...'
            name={`${questionIndex}`}
            form='surveyForm'
            defaultValue={question.answerValue ? question.answerValue : ''}
            required={question.mandatory}
          ></textarea>
        </>
      );
    case 4:
      //Select
      return (
        <>
          <select
            className='border	rounded-lg border-gray-400 p-3 resize-none w-full mt-2'
            defaultValue={question.answerValue ? question.answerValue : ''}
            name={`${questionIndex}`}
            required={question.mandatory}
          >
            {!question.answerValue && (
              <option value='' disabled hidden>
                {question.content}
              </option>
            )}
            {question.itens?.map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </>
      );
    case 5:
      //Single Choice
      return (
        <>
          <QuestionContent
            content={question.content}
            mandatory={question.mandatory}
          />
          <div className='flex mt-2 gap-4 text-sm text-gray-700'>
            {question.itens?.map((item, index) => (
              <div key={index} className='flex gap-2'>
                <input
                  type='radio'
                  name={`${questionIndex}`}
                  value={item.value}
                  defaultChecked={index === question.answerValue}
                  required={question.mandatory}
                />
                <label>{item.description}</label>
              </div>
            ))}
          </div>
        </>
      );
    case 6:
      //Multiple Choice
      return (
        <>
          <QuestionContent
            content={question.content}
            mandatory={question.mandatory}
          />
          <div className='flex flex-wrap mt-2 gap-4 text-sm text-gray-700'>
            <MultipleChoice
              itens={question?.itens}
              horizontal={question.horizontal}
              questionIndex={questionIndex}
              required={question.mandatory}
            />
          </div>
        </>
      );
    default:
      return null;
  }
};

const SurveyForm = async ({ questionList }: Props) => {
  const postSurvey = async (state: any, formData: FormData) => {
    'use server';

    try {
      const userSubmission = handleSubmits(formData, questionList);
      await sendFakePost(userSubmission);
      return {
        error: false,
        message: 'Pesquisa enviada com sucesso!',
      };
    } catch (error) {
      return {
        error: true,
        message: (error as Error).message,
      };
    }
  };

  const postError = async (formData: FormData) => {
    'use server';

    try {
      const res = await sendError();
      return {
        error: true,
        message: res.error,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const postSuccess = async (formData: FormData) => {
    'use server';

    try {
      const res = await sendSuccess();
      return {
        error: false,
        message: 'Pesquisa enviada com sucesso!',
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col max-w-[648px] mx-auto relative bottom-48 gap-6'>
      <h1 className='text-center md:text-left text-[40px] font-semibold text-white'>
        Pesquisa de Satisfação
      </h1>
      <form
        className='flex flex-col gap-y-10 bg-white p-8 rounded-2xl'
        id='surveyForm'
      >
        {questionList?.map((question, index) => (
          <div key={index}>{renderQuestionByType(question, index)}</div>
        ))}

        <SubmitButton action={postSurvey} text='Enviar Fake Post' />
        <SubmitButton action={postError} text='Enviar Erro' />
        <SubmitButton action={postSuccess} text='Enviar Sucesso' />
      </form>
    </div>
  );
};

export default SurveyForm;
