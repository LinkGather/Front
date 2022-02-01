import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import { PostContext } from '../contextAPI/posts';
import { getPostApi, getPostSortApi } from '../axios/axios';
import Loader from 'react-spinners/SyncLoader';
import NavBar from '../components/NavBar';

const Main = (props) => {
  const [cards, setCards] = useState([{}]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    setPosts();
  }, []);

  return (
    <PostContext.Provider value={{ cards, setPosts, sortPosts }}>
      <Header />
      <NavBar />
      {loading ? <CardList /> : <Loader css={{ position: 'absolute', top: '50%', left: '50%' }} />}
    </PostContext.Provider>
  );
};

export default Main;
