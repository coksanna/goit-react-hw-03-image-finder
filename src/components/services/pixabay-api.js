import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    per_page: 12,
    key: '31928334-7c8a8d5fdbb3c6a1bd6729fff',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
