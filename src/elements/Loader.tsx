import * as React from 'react';
import LoaderSpinner from 'react-spinners/SyncLoader';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderWrap>
      <LoaderSpinner />
    </LoaderWrap>
  );
};

const LoaderWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export default Loader;
