import axios from 'axios';
import { SigninData, SignupData, submitPostData } from '../interfaces/data';
import { getToken } from '../util/getToken';

const api = axios.create({
  baseURL: 'https://linkgather.shop/api',
  // baseURL: 'http://localhost:3001',
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
export const signUpApi = async (data: SignupData) => {
  try {
    console.log(data);
    const res = await api.post('/api/users/signup', {
      email: data.email,
      name: data.name,
      password: data.password,
      passwordCheck: data.passwordCheck,
    });
    return res;
  } catch (err: any) {
    return err.response;
  }
};

//로그인 api
export const loginApi = async (data: SigninData) => {
  try {
    console.log(data);
    const res = await api.post('/api/users/signin', {
      email: data.email,
      password: data.password,
    });
    return res;
  } catch (err: any) {
    return err.response;
  }
};

//이미지 미리보기 api
export const previewApi = async (url: string) => {
  try {
    return await api.post(`/api/posts/preview`, {
      url: url,
    });
  } catch (err: any) {
    return err.response;
  }
};

//포스트 뷰 api
export const getPostApi = async () => {
  try {
    return await api.get('/api/posts');
  } catch (err: any) {
    return err.response;
  }
};

//추천순 뷰 api
export const getPostSortApi = async () => {
  try {
    const res = await api.get('/api/posts/sort');
    console.log('응답하라', res);
    return res;
  } catch (err: any) {
    return err.response;
  }
};

//마이페이지 뷰 api
export const getMyPostApi = async () => {
  try {
    return await api.get(`/api/posts/mypage`);
  } catch (err: any) {
    return err.response;
  }
};

//포스트 등록 api
export const submitPostApi = async (data: submitPostData) => {
  try {
    return api.post('/api/posts', {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  } catch (err: any) {
    return err.response;
  }
};

//포스트 수정 api
export const editPostApi = async (id: number, data: submitPostData) => {
  try {
    return api.patch(`/api/posts/${id}`, {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  } catch (err: any) {
    return err.response;
  }
};

//추천하기 api
export const likeApi = async (id: number) => {
  try {
    return await api.post(`/api/posts/${id}/like`);
  } catch (err: any) {
    return err.response;
  }
};

//찜하기 api
export const dibApi = async (id: number) => {
  try {
    return await api.post(`/api/posts/${id}/dib`);
  } catch (err: any) {
    return err.response;
  }
};

//검색하기 api
export const searchApi = async (words: string) => {
  try {
    return await api.get(`/api/posts/search?words=${words}`);
  } catch (err: any) {
    return err.response;
  }
};

//삭제하기 api
export const deletePostApi = async (id: number) => {
  try {
    return await api.delete(`/api/posts/${id}`);
  } catch (err: any) {
    return err.response;
  }
};

export default api;
