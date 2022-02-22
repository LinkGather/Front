export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return `${token}`;
  }
  return '';
};

export const isToken = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
