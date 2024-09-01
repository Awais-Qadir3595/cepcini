import axios from 'axios';
import { BASE_URL } from './ROUTES';

const apiRequest = async function (options, headers = {}) {
 
  const onSuccess = (response) => {
    return response;
  };

  const onError = function (error) {
    return Promise.reject(error.response || error.message);
  };

  return axios({
    baseURL: BASE_URL,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(onSuccess)
    .catch(onError);
};

export default apiRequest;