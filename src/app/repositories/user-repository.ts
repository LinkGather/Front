import { httpClient } from '../libs/http-client';

type defaultResponse = {
  success: boolean;
};

export const userRepository = {
  signUp(data: { name: string; email: string; password: string; passwordCheck: string }) {
    return httpClient.post<defaultResponse>('/api/users/signup', {
      email: data.email,
      name: data.name,
      password: data.password,
      passwordCheck: data.passwordCheck,
    });
  },
};
