import * as React from 'react';
import { useEffect, useState } from 'react';
import Loader from '../elements/Loader';
import styled from 'styled-components';
import { getMyPostApi } from '../axios/axios';
import CardList from '../components/CardList';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { PostContext } from '../contextAPI/posts';

const MyPage = () => {
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
  const setPosts = async () => {
    const res = await getMyPostApi();
    setCards(res.data.posts);
    setLoading(true);
  };
  const sortPosts = async () => {};

  useEffect(() => {
    setPosts();
  }, []);

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

const PostNull = styled.div`
  width: 1176px;
  margin: auto;
  font-size: 13px;
  color: #ff6b6b;
`;

export default MyPage;
