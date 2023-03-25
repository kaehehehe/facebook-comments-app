import React from 'react';
import styled from 'styled-components';
import Article from '../components/Article';

import Header from '../components/Header';
import COLOR from '../themes/color';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: ${COLOR.gray100};
  `
};

const Home = () => {
  return (
    <S.Container>
      <Header />
      <Article />
    </S.Container>
  );
};

export default Home;
