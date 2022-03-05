import { httpClient } from '../libs/http-client';

type DefaultResponse = {
  success: boolean;
};

type Token = {
  token: string;
};

export const userRepository = {
  signUp(data: { name: string; email: string; password: string; passwordCheck: string }) {
    return httpClient.post<DefaultResponse & { msg: string }>('/api/users/signup', {
      email: data.email,
      name: data.name,
      password: data.password,
      passwordCheck: data.passwordCheck,
    });
  },

  login(data: { email: string; password: string }) {
    return httpClient.post<Token & DefaultResponse>('/api/users/signin', {
      email: data.email,
      password: data.password,
    });
  },
};
