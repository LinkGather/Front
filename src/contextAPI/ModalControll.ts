import { createContext } from 'react';

export const PostModalContext = createContext({
  modalOpen: false,
  setModalState: (e: React.MouseEvent<HTMLElement>) => {},
});
