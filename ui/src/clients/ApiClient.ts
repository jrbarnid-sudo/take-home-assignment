import axios from 'axios';

export const get = async (url: string) => {
  const results = await axios.get(url);

  return results.data;
};

export const post = async (url: string, data: object) => {
  const results = await axios.post(url, data);

  return results.data;
};
