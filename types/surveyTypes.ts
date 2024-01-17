export type Item = {
  value: number;
  description: string;
};

export type Question = {
  typeQuestion: number;
  mandatory: boolean;
  content: string;
  answerValue?: number | string;
  horizontal?: boolean;
  itens?: Item[];
};
