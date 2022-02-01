import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { children, isFill, url, _onClick } = props;
  return isFill ? (
    url ? (
      <FillButton
        onClick={() => {
          window.open(url);
        }}
      >
        {children}
      </FillButton>
    ) : (
      <FillButton onClick={_onClick}>{children}</FillButton>
    )
  ) : (
    <SubmitButton onClick={_onClick}>{children}</SubmitButton>
  );
};

Button.defaultProps = {
  isFill: false,
  url: false,
  _onClick: () => {},
};

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  padding: 20px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border: 0;
  border-radius: 3px;
  background-color: #000;
`;

const FillButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: #343a40;
  border-radius: 3px;
  border: 0;
  width: 49%;
  padding: 8px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #343a40;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default Button;
