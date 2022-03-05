/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { CardList, NavBar } from '../components';
import { PostContext } from '../libs/contextAPI';
import { postRepository } from '../repositories';
import { Loader } from '../elements';

export * from './signup';
export * from './search';
export * from './mypage';
export * from './login';

const IndexScreen = () => {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks
  const [cards, setCards] = useState([
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
  ]);
  const [loading, setLoading] = useState(false);
  // formik

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    setLoading(false);
    postRepository.list().then((res) => {
      setCards(res.posts);
      setLoading(true);
    });
  }, []);

  // handlers
  const setPosts = async () => {
    setLoading(false);
    const res = await postRepository.list();
    if (res.success) {
      setCards(res.posts);
      setLoading(true);
    }
  };

  const sortPosts = async () => {
    setLoading(false);
    const res = await postRepository.list();
    if (res.success) {
      setCards(res.posts);
      setLoading(true);
    }
  };

  return (
    <PostContext.Provider value={{ cards, setPosts, sortPosts }}>
      <NavBar />
      {loading ? <CardList /> : <Loader />}
    </PostContext.Provider>
  );
};

export { IndexScreen };
