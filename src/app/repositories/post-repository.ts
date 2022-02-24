import { PostModel } from '../models/post-model';
import { httpClient } from '../libs/http-client';

export const postRepository = {
  list() {
    return httpClient.get<{ posts: PostModel }>('/api/posts');
  },

  submitPost(data: { url: string; title: string; description: string }) {
    return httpClient.post('/api/posts', {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  },

  editPost(params: { id: number }, data: { url: string; title: string; description: string }) {
    return httpClient.patch(`/api/posts/${params.id}`, {
      url: data.url,
      title: data.title,
      description: data.description,
    });
  },
};
