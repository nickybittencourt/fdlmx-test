import SurveyForm from '@/components/SurveyForm/SurveyForm';
import { getQuestionList } from '@/services/surveyFormService';

export default async function Home() {
  const questionList = await getQuestionList();
  return (
    <main className=' min-h-screen bg-slate-100'>
      <div className='bg-[#19202D] h-[244px]'>
        <p className='text-xs px-5 sm:px-16 py-3 text-gray-400'>
          Pesquisa de Satisfação
        </p>
      </div>
      <SurveyForm questionList={questionList?.itens} />
    </main>
  );
}
