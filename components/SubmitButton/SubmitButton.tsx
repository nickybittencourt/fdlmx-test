'use client';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Props = {
  text: string;
  action:
    | ((
        state: any,
        formData: FormData
      ) => Promise<{ error: boolean; message: string }>)
    | ((
        formData: FormData
      ) => Promise<{ error: boolean; message: any } | undefined>);
};

const SubmitButton = ({ action, text }: Props) => {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState<any, FormData>(action, null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (state?.message) {
      setAlertMessage(state.message);
      setOpen(true);
    }
  }, [state]);

  return (
    <>
      <button
        className='rounded-full bg-yellow-500 w-[187px] h-14 p-x-16 p-y-2.5 text-gray-900 font-bold text-lg'
        formAction={formAction}
      >
        {text}
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='mx-auto'>
              {alertMessage}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className={`${
                state?.error ? 'bg-red-500' : 'bg-green-500'
              } mx-auto mt-5`}
            >
              Fechar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SubmitButton;
