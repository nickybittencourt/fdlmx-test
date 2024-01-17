import axios from 'axios';

import { Question } from '@/types/surveyTypes';

const BASE_URL =
  'https://fdlmx-backgrounds.sfo3.digitaloceanspaces.com/front-test';

export const getQuestionList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/survey.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendFakePost = async (payload: Question[]) => {
  try {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/posts/`,
      payload
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const sendError = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/survey-post-error.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendSuccess = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/survey-post-success.json`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
