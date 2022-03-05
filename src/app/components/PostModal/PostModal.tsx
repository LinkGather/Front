import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { postRepository } from '../../repositories';
import { Button, CloseButton } from '../../elements';
import { PostContext, PostModalContext } from '../../libs/contextAPI';

const GrayBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.8);
`;

const PopUpWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 550px;
  z-index: 10;
  width: 520px;
  padding: 30px 40px;
  background-color: #fff;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
  @media (max-width: 767px) {
    width: 80%;
    min-width: auto;
  }
  @media (max-width: 575px) {
    padding: 20px;
  }
`;

const ContentWrap = styled.div`
  max-height: 490px;
`;

const Subject = styled.div`
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: -0.6px;
`;

const InputWrap = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 300px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const PreviewInput = styled.input`
  padding: 15px 10px;
  border: 1px solid #dee2e6;
  border-radius: 3px 0px 0px 3px;
  width: 348px;
`;

const Preview = styled.button`
  width: 150px;
  padding: 15px 10px;
  color: #fff;
  background: #000;
  border: 0;
  border-radius: 0px 3px 3px 0px;
  cursor: pointer;
`;

const InputEl = styled.input`
  padding: 15px 10px;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
`;

const Description = styled.textarea`
  padding: 15px 10px;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  resize: none;
`;

const ErrMessage = styled.span`
  font-size: 0.6em;
  color: #ff6b6b;
`;

const PostModal = () => {
  const { modalOpen, setModalState } = useContext(PostModalContext);

  // modal state
  const [open, setOpen] = useState(modalOpen);

  // 포스트 정보 state
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');

  // 에러 state
  const [urlNull, setUrlNull] = useState(false);
  const [titleNull, setTitleNull] = useState(false);
  const [descriptionNull, setDescriptionNull] = useState(false);

  // context api
  const { setPosts } = useContext(PostContext);

  // ref
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  // input onChange event
  const urlChange = (e: React.ChangeEvent<HTMLElement>) => {
    const URL = (e.target as HTMLInputElement).value;
    setUrl(URL);
  };

  const titleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const TITLE = (e.target as HTMLInputElement).value;
    setTitle(TITLE);
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLElement>) => {
    const description = (e.target as HTMLTextAreaElement).value;
    setDescription(description);
  };

  // preview image
  const getPreview = async () => {
    if (!url) {
      setUrlNull(true);
      urlRef.current?.focus();
      return;
    }
    const res = await postRepository.preview({ url });
    if (res.success) {
      setPreview(res.image);
      setUrlNull(false);
      setTitleNull(false);
      setDescriptionNull(false);
    } else {
      console.log(res);
    }
  };

  // submit post
  const submitPost = async () => {
    const data = {
      url,
      title,
      description,
    };
    if (!url) {
      setUrlNull(true);
      setTitleNull(false);
      setDescriptionNull(false);
      urlRef.current?.focus();
      return;
    }
    if (!title) {
      setUrlNull(false);
      setTitleNull(true);
      setDescriptionNull(false);
      titleRef.current?.focus();
      return;
    }
    if (!description) {
      setUrlNull(false);
      setTitleNull(false);
      setDescriptionNull(true);
      descriptionRef.current?.focus();
      return;
    }
    const res = await postRepository.submitPost(data);
    if (res.success) {
      alert('등록되었습니다.');
      setOpen(false);
      setUrl('');
      setTitle('');
      setDescription('');
      setPreview('');
      setUrlNull(false);
      setTitleNull(false);
      setDescriptionNull(false);
      await setPosts();
    } else {
      console.log(res);
    }
  };

  return (
    <>
      {open && (
        <GrayBackground className="handleModal" onClick={setModalState}>
          <PopUpWrap>
            <Subject>등록하기</Subject>
            <CloseButton _onClick={setModalState} />
            <ContentWrap>
              {preview && <PreviewImage src={preview} alt="" />}
              <>
                <InputWrap>
                  <Label>웹 사이트 URL</Label>
                  <div style={{ display: 'flex' }}>
                    <PreviewInput placeholder="https://www.linkgather.com" ref={urlRef} onChange={urlChange} />
                    <Preview onClick={getPreview}>이미지 미리보기</Preview>
                  </div>
                  {urlNull && <ErrMessage>url을 입력해주세요</ErrMessage>}
                </InputWrap>
                <InputWrap>
                  <Label>제목</Label>
                  <InputEl type="text" placeholder="제목을 입력해주세요" ref={titleRef} onChange={titleChange} />
                  {titleNull && <ErrMessage>제목을 입력해주세요</ErrMessage>}
                </InputWrap>

                <InputWrap>
                  <Label>설명</Label>
                  <Description
                    placeholder="사이트에 대한 간략한 설명을 입력해주세요"
                    ref={descriptionRef}
                    onChange={descriptionChange}
                  />
                  {descriptionNull && <ErrMessage>간단한 설명을 입력해주세요</ErrMessage>}
                </InputWrap>
                <Button isFill={false} _onClick={submitPost}>
                  등록하기
                </Button>
              </>
            </ContentWrap>
          </PopUpWrap>
        </GrayBackground>
      )}
    </>
  );
};

export { PostModal };
