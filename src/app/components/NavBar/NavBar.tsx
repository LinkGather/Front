/* eslint-disable import/no-cycle */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PostModal } from '../PostModal';
import { PostModalContext, PostContext, UserContext } from '../../libs/contextAPI';
import { Click, NavBarProps } from '../../libs/interfaces/props';

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
  @media (max-width: 1200px) {
    padding: 0 15px;
    box-sizing: border-box;
  }
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

  color: ${(props: Click) => (props.click ? '#339af0' : 'black')};
`;

const WordWrap = styled.span`
  font-size: 14.5px;
`;

const PostButton = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavBar: React.FC<NavBarProps> = (props) => {
  const { searched } = props;
  const { cards, sortPosts, setPosts } = useContext(PostContext);
  const { isLogin } = useContext(UserContext);

  const history = useHistory();
  const searchWord = decodeURI(history.location.search.split('=')[1]);
  // sort state
  const [sortedRecent, setSortedRecent] = useState(true);
  const [sortedRecomend, setSortedRecomend] = useState(false);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

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

  const setModalState = (e: React.MouseEvent<HTMLElement>) => {
    if (
      isLogin &&
      ((e.target as Element).getAttribute('class') === 'handleModal' ||
        (e.target as Element).className.includes('handleModal'))
    ) {
      setModalOpen(!modalOpen);
    } else if (!isLogin) {
      alert('????????? ????????????');
    }
  };

  return (
    <PostModalContext.Provider value={{ modalOpen, setModalState }}>
      <PostingContainer>
        <PostingBox>
          {searched ? (
            <WordWrap>
              {searchWord ? (
                <>
                  <strong>{searchWord}</strong>(???)??? ????????? ???????????????. ({cards.length}???)
                </>
              ) : (
                <>???????????? ???????????? ????????? ???????????? ?????? ????????? ????????????.</>
              )}
            </WordWrap>
          ) : (
            <div>
              {sortedRecent ? (
                <Sort click={true} onClick={sortRecent}>
                  ?????????
                </Sort>
              ) : (
                <Sort onClick={sortRecent}>?????????</Sort>
              )}
              <span style={{ color: '#dee2e6', margin: '0px 10px' }}>|</span>
              {sortedRecomend ? (
                <Sort click={true} onClick={sortRecomend}>
                  ?????????
                </Sort>
              ) : (
                <Sort onClick={sortRecomend}>?????????</Sort>
              )}
            </div>
          )}
          <PostButton className="handleModal" onClick={setModalState}>
            ??????
          </PostButton>
        </PostingBox>
      </PostingContainer>
      {modalOpen && <PostModal />}
    </PostModalContext.Provider>
  );
};

export { NavBar };
