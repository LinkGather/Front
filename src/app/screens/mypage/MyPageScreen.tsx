/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../../../elements/Loader';
import { getMyPostApi } from '../../../axios/axios';
import CardList from '../../../components/CardList';
import NavBar from '../../../components/NavBar';
import { PostContext } from '../../../contextAPI/posts';

const PostNull = styled.div`
  width: 1176px;
  margin: auto;
  font-size: 13px;
  color: #ff6b6b;
`;

const MyPageScreen = () => {
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
    getMyPostApi().then((res) => {
      setCards(res.data.posts);
      setLoading(true);
    });
  }, []);
  // handlers
  const setPosts = async () => {
    const res = await getMyPostApi();
    setCards(res.data.posts);
    setLoading(true);
  };
  const sortPosts = async () => {};

  return (
    <PostContext.Provider value={{ cards, setPosts, sortPosts }}>
      <NavBar />
      {loading ? (
        cards.length ? (
          <CardList />
        ) : (
          <PostNull>작성한 글이 없습니다. 우측상단의 등록버튼을 통해 등록해주세요</PostNull>
        )
      ) : (
        <Loader />
      )}
    </PostContext.Provider>
  );
};
export { MyPageScreen };