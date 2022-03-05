import { PostModel } from '../models/post-model';
import { httpClient } from '../libs/http-client';

type DefaultReturn = {
  success: boolean;
};

export const postRepository = {
  list() {
    return httpClient.get<DefaultReturn & { posts: PostModel[] }>('/api/posts');
  },

  sortedList() {
    return httpClient.get<DefaultReturn & { posts: PostModel[] }>('/api/posts/sort');
  },

  myPage() {
    return httpClient.get<{ posts: PostModel[] }>('/api/posts/mypage');
  },

  submitPost(data: { url: string; title: string; description: string }) {
    return httpClient.post<DefaultReturn>('/api/posts', {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  },

  editPost(params: { id: number }, data: { url: string; title: string; description: string }) {
    return httpClient.patch<DefaultReturn & { newPost: PostModel } & { msg?: string }>(`/api/posts/${params.id}`, {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  },

  deletePost(params: { id: number }) {
    return httpClient.delete<DefaultReturn & { msg?: string }>(`/api/posts/${params.id}`);
  },

  preview(data: { url: string }) {
    return httpClient.post<DefaultReturn & { image: string }>('/api/posts/preview', { url: data.url });
  },

  like(params: { id: number }) {
    return httpClient.post<DefaultReturn & { msg: string; likeNum: number }>(`/api/posts/${params.id}/likes`, {});
  },

  dib(params: { id: number }) {
    return httpClient.post<DefaultReturn & { msg: string }>(`/api/posts/${params.id}/dib`, {});
  },

  search(params: { words: string }) {
    return httpClient.get<DefaultReturn & { posts: PostModel[] }>(`/api/posts/search?words=${params.words}`);
  },
};
