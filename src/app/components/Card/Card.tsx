/* eslint-disable import/no-cycle */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FiThumbsUp } from 'react-icons/fi';
import { postRepository } from '../../repositories';
import { CardDetail } from '../CardDetail';
import { Button } from '../../elements';
import { UserContext } from '../../libs/contextAPI';
import { CardProps } from '../../libs/interfaces';
import { ReactComponent as EmptyHeart } from '../../../assets/images/EmptyHeart.svg';
import { ReactComponent as FillHeart } from '../../../assets/images/FillHeart.svg';
import LikeCountImg from '../../../assets/images/LikeCount.png';

const ImgHidden = styled.div`
  overflow: hidden;
  justify-content: center;
  height: 155px;
  align-items: center;
  display: flex;
  position: relative;
  cursor: pointer;
  & img {
    height: 155px;
    object-fit: cover;
    width: 100%;
    border-radius: 3px;
    margin-bottom: 8px;
    &:hover {
      transform: scale(1.1);
      transition: 0.3s ease 0s, opacity 0.1s linear 0s !important;
    }
    @media (max-width: 980px) {
      height: 200px;
      object-fit: cover;
    }
    @media (max-width: 575px) {
      height: 250px;
    }
  }
  @media (max-width: 980px) {
    height: 100%;
  }
`;

const Jjim = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-color: transparent;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  cursor: pointer;
  filter: drop-shadow(rgba(41, 42, 43, 0.2) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.2) 0px 0px 0.5px);
  &:hover {
    background-color: rgb(239, 239, 239, 0.1);
    transition: background-color 0.3s ease 0s;
  }
  & svg {
    width: 32px;
    height: 32px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.15px;
  color: rgb(26, 26, 26);
  height: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 4px 0px 6px;
  cursor: pointer;
`;

const CountWrap = styled.div`
  display: flex;
  font-size: 11px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: normal;
  margin: 0px 8px 0px 0px;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(162, 162, 162);
  cursor: pointer;
  & img {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex: 0 0 auto;
    height: 12px;
    margin-right: 2px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  margin: 10px 0 0 0;
  justify-content: space-between;
  @media (max-width: 767px) {
    min-width: 192px;
  }
`;

const Card: React.FC<CardProps> = (props) => {
  const { card } = props;
  const { isLogin } = useContext(UserContext);
  // 좋아요, 찜하기 state
  const [likes, setLikes] = useState(card?.likeNum);
  const [Dibs, setDibs] = useState(!!card?.dibs?.length);
  // modal state
  const [open, setOpen] = useState(false);

  // 찜하기
  const Dib = async (id: number) => {
    const res = await postRepository.dib({ id });
    if (res.success) {
      setDibs(!Dibs);
    } else {
      alert('로그인 해주세요');
    }
  };

  const like = async (id: number) => {
    const res = await postRepository.like({ id });
    if (res.success) {
      setLikes(res.likeNum);
    } else {
      alert('로그인 해주세요');
    }
  };

  const handleDetailModal = (e: React.MouseEvent<HTMLElement>) => {
    if (
      (e.target as Element).getAttribute('class') === 'handleModal' ||
      (e.target as Element).className?.includes('handleModal')
    ) {
      if (open) {
        document.body.style.overflow = 'unset';
      } else {
        document.body.style.overflow = 'hidden';
      }
      setOpen(!open);
    }
  };

  return (
    <>
      {open ? <CardDetail _onClick={handleDetailModal} card={card} /> : null}
      <ImgHidden>
        <img src={card?.image} alt="" className="handleModal" onClick={handleDetailModal} />
        <Jjim
          onClick={() => {
            Dib(card?.id);
          }}
        >
          {Dibs && isLogin ? <FillHeart /> : <EmptyHeart />}
        </Jjim>
      </ImgHidden>
      <Title className="handleModal" onClick={handleDetailModal}>
        {card?.title}
      </Title>
      <CountWrap className="handleModal" onClick={handleDetailModal}>
        <img src={LikeCountImg} alt="" className="handleModal" onClick={handleDetailModal} />
        <span className="handleModal" onClick={handleDetailModal}>
          {likes}
        </span>
      </CountWrap>
      <hr />
      <ButtonWrap>
        <Button
          isFill={true}
          _onClick={() => {
            like(card?.id);
          }}
        >
          <FiThumbsUp style={{ width: '16px', height: '16px' }} />
          <span>추천하기</span>
        </Button>
        <Button isFill={true} url={card?.url}>
          <span>바로가기</span>
        </Button>
      </ButtonWrap>
    </>
  );
};

export { Card };
