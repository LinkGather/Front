import { createContext } from 'react';

export const PostContext = createContext({
  cards: [
    {
      id: 0,
      title: '',
      description: '',
      image: '',
      url: '',
      uploadTime: '',
      likeNum: 0,
      dibs: [{}],
      likes: [{}],
    },
  ],
  setPosts: async () => {},
  sortPosts: async () => {},
});
