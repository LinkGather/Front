import axios from 'axios';
import { getToken } from '../util/getToken';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    'accept': 'application/json',
  },
  withCredentials: true,
});

//header 설정
api.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers['Accept'] = '*/*';
  config.headers['authorization'] = getToken();
  return config;
});

//회원가입 api
export const signUpApi = async (data) => {
  try {
    console.log(data);
    const res = await api.post('/users/signup', {
      email: data.email,
      name: data.name,
      password: data.password,
      passwordCheck: data.passwordCheck,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

//로그인 api
export const loginApi = async (data) => {
  try {
    console.log(data);
    const res = await api.post('/users/signin', {
      email: data.email,
      password: data.password,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

//이미지 미리보기 api
export const previewApi = async (url) => {
  try {
    return await api.post(`/posts/preview`, {
      url: url,
    });
  } catch (err) {
    return err.response;
  }
};

//포스트 뷰 api
export const getPostApi = async () => {
  try {
    return await api.get('/posts');
  } catch (err) {
    return err.response;
  }
};

//추천순 뷰 api
export const getPostSortApi = async () => {
  try {
    return await api.get('/posts/sort');
  } catch (err) {
    return err.response;
  }
};

//마이페이지 뷰 api
export const getMyPostApi = async () => {
  try {
    return await api.get(`/posts/mypage`);
  } catch (err) {
    return err.response;
  }
};

//포스트 등록 api
export const submitPostApi = async (data) => {
  try {
    return api.post('/posts', {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  } catch (err) {
    return err.response;
  }
};

//포스트 수정 api
export const editPostApi = async (id, data) => {
  try {
    return api.patch(`/posts/${id}`, {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  } catch (err) {
    return err.response;
  }
};

//추천하기 api
export const likeApi = async (id) => {
  try {
    return await api.post(`/posts/${id}/like`);
  } catch (err) {
    return err.response;
  }
};

//찜하기 api
export const dibApi = async (id) => {
  try {
    return await api.post(`/posts/${id}/dib`);
  } catch (err) {
    return err.response;
  }
};

//검색하기 api
export const searchApi = async (words) => {
  try {
    return await api.get(`/posts/search?words=${words}`);
  } catch (err) {
    return err.response;
  }
};

//삭제하기 api
export const deletePostApi = async (id) => {
  try {
    return await api.delete(`/posts/${id}`);
  } catch (err) {
    return err.response;
  }
};

export default api;
