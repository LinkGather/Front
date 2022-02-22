import * as React from 'react';
import { useEffect, useState } from 'react';
import CardList from '../../components/CardList';
import { PostContext } from '../../contextAPI/posts';
import { getPostApi, getPostSortApi } from '../../axios/axios';
import Loader from '../../elements/Loader';
import NavBar from '../../components/NavBar';

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
    getPostApi().then((res) => {
      setCards(res.data.posts);
      setLoading(true);
    });
  }, []);

  // handlers
  const setPosts = async () => {
    setLoading(false);
    const res = await getPostApi();
    if (res.status === 200) {
      setCards(res.data.posts);
      setLoading(true);
    }
  };

  const sortPosts = async () => {
    setLoading(false);
    const res = await getPostSortApi();
    if (res.status === 200) {
      setCards(res.data.posts);
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
