import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PostContext } from '../contextAPI/posts';
import PostModal from './PostModal';

const NavBar = (props) => {
  const { searched } = props;
  const { cards, sortPosts, setPosts } = useContext(PostContext);

  const history = useHistory();
  const searchWord = history.location.search.split('=')[1];

  //sort state
  const [sortedRecent, setSortedRecent] = useState(true);
  const [sortedRecomend, setSortedRecomend] = useState(false);

  const sortRecent = async () => {
    if (!sortedRecent) {
      await setPosts();
      setSortedRecent(true);
      setSortedRecomend(false);
    }
  };

  const sortRecomend = async () => {
    if (!sortedRecomend) {
      await sortPosts();
      setSortedRecent(false);
      setSortedRecomend(true);
    }
  };

  return (
    <PostingContainer>
      <PostingBox>
        {searched ? (
          <WordWrap>
            {searchWord ? (
              <>
                <strong>{searchWord}</strong>(으)로 검색한 결과입니다. ({cards.length}개)
              </>
            ) : (
              <>검색어를 입력하지 않으면 랜덤으로 카드 한장이 나옵니다.</>
            )}
          </WordWrap>
        ) : (
          <div>
            {sortedRecent ? (
              <Sort click={true} onClick={sortRecent}>
                최신순
              </Sort>
            ) : (
              <Sort onClick={sortRecent}>최신순</Sort>
            )}
            <span style={{ color: '#dee2e6', margin: '0px 10px' }}>|</span>
            {sortedRecomend ? (
              <Sort click={true} onClick={sortRecomend}>
                추천순
              </Sort>
            ) : (
              <Sort onClick={sortRecomend}>추천순</Sort>
            )}
          </div>
        )}
        <PostModal />
      </PostingBox>
    </PostingContainer>
  );
};

const PostingContainer = styled.div`
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 70px;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
`;
const PostingBox = styled.div`
  width: 1170px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Sort = styled.span`
  font-size: 12px;
  cursor: pointer;
  &:hover {
    animation: fade 1s;
    @keyframes fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    color: #339af0;
  }

  color: ${(props) => (props.click ? '#339af0' : 'black')};
`;

const WordWrap = styled.span`
  font-size: 14.5px;
`;

export default NavBar;
