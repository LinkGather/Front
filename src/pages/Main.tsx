import * as React from 'react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardList from '../components/CardList';
import { PostContext } from '../contextAPI/posts';
import { getPostApi, getPostSortApi } from '../axios/axios';
import Loader from '../elements/Loader';
import NavBar from '../components/NavBar';

const Main = () => {
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
      {loading ? <CardList /> : <Loader />}
    </PostContext.Provider>
  );
};

export default Main;
