import React from 'react';

import styled from 'styled-components';
import { FaFacebook } from 'react-icons/fa';
import COLOR from '../themes/color';
import { Text } from '../themes/element';

const S = {
  Header: styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 56px;
    padding-left: 20px;
    background-color: ${COLOR.white};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  `
};

const Header = () => {
  return (
    <S.Header>
      <FaFacebook
        color={COLOR.blue}
        size={40}
      />
      <Text
        fontSize={20}
        color={COLOR.blue}
        padding="0 0 0 10px"
        fontWeight={700}
      >
        Facebook
      </Text>
    </S.Header >
  );
};

export default Header;
