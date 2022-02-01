import { createContext } from 'react';

export const PostContext = createContext({
  cards: [{}],
  setPosts: async () => {},
  sortPosts: async () => {},
});
