/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { Grid, TopButton } from '../../elements';
import { PostContext } from '../../libs/contextAPI/posts';

const CardBg = styled.div`
  margin-bottom: 32px;
  border-radius: 5px;
  @media (max-width: 767px) {
    min-width: 270px;
  }
`;

const CardList = () => {
  // useContext
  const { cards } = useContext(PostContext);
  return (
    <Grid>
      <TopButton />
      {cards.map((card, i) => {
        return (
          <CardBg key={i}>
            <Card card={card} />
          </CardBg>
        );
      })}
    </Grid>
  );
};

export { CardList };
