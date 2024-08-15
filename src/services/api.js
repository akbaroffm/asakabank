import axios from 'axios';

const api = async ({ url, method = 'GET', data }) => {
  const language = localStorage.getItem('i18nextLng') || 'uz'; // default to 'uz' if not found
  const baseURL = 'https://career-api.asakabank.uz';
  const headers = {
    'accept-language': language,
  };
  return axios({
    url,
    data,
    method,
    headers,
    baseURL,
  });
};

export default api;
