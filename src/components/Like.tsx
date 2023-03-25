import React from 'react';
import styled from 'styled-components';
import { RiThumbUpFill } from 'react-icons/ri';

import COLOR from '../themes/color';

const S = {
  Like: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${COLOR.blue};
  `
};

const Like = () => {
  return (
    <S.Like>
      <RiThumbUpFill
        size="14"
        color={COLOR.white}
      />
    </S.Like >
  );
};

export default Like;
