import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardList from '../../../components/CardList';
import Loader from '../../../elements/Loader';
import { searchApi } from '../../../axios/axios';
import { PostContext } from '../../../contextAPI/posts';
import NavBar from '../../../components/NavBar';

const SearchScreen: React.FC = () => {
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
  const history = useHistory();

  // formik

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    setLoading(false);
    searchApi(history.location?.search?.split('=')[1]).then((res) => {
      setCards(res.data.posts);
      setLoading(true);
    });
  }, []);
  // handlers

  const setPosts = async () => {
    const res = await searchApi(history.location?.search?.split('=')[1]);
    if (res.status === 200) {
      setCards(res.data.posts);
      setLoading(true);
    } else {
      console.dir(res);
    }
  };
  const sortPosts = async () => {};

  return (
    <PostContext.Provider value={{ cards, setPosts, sortPosts }}>
      <NavBar searched={true} />
      {loading ? <CardList /> : <Loader />}
    </PostContext.Provider>
  );
};

export { SearchScreen };
