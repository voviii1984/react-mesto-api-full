export const BASE_URL = 'https://api.voviii1984.student.nomoredomains.monster';

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    headers,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    headers,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers,
  }).then((res) => checkResponse(res));
};
