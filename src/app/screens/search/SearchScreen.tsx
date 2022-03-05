import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardList, NavBar } from '../../components';
import { Loader } from '../../elements';
import { postRepository } from '../../repositories';
import { PostContext } from '../../libs/contextAPI';

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
    postRepository.search({ words: history.location?.search?.split('=')[1] }).then((res) => {
      setCards(res.posts);
      setLoading(true);
    });
  }, []);
  // handlers

  const setPosts = async () => {
    const res = await postRepository.search({ words: history.location?.search?.split('=')[1] });
    if (res.success) {
      setCards(res.posts);
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
