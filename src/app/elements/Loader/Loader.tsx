import React from 'react';
import LoaderSpinner from 'react-spinners/SyncLoader';
import styled from 'styled-components';

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loader = () => {
  return (
    <LoaderWrap>
      <LoaderSpinner />
    </LoaderWrap>
  );
};
export { Loader };
