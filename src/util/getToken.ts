export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return `${token}`;
  } else {
    return null;
  }
};

export const isToken = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};
