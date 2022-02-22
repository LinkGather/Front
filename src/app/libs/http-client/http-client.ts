import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const httpClient = (() => {
  const axios = Axios.create({ baseURL: 'http://localhost:3001' });
  return {
    async get<T>(url: string, config?: { params?: Record<string, any> }): Promise<T> {
      const res = await axios.get(url, config);
      return res?.data;
    },
    async post<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await axios.post(url, data);
      return res?.data;
    },
    async patch<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await axios.patch(url, data);
      return res?.data;
    },
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      return axios.delete(url, config);
    },
  };
})();
