import React, { type KeyboardEvent, type ChangeEvent } from 'react';

import styled from 'styled-components';
import COLOR from '../themes/color';

const S = {
  Input: styled.input`
    width: 100%;
    height: 30px;
    padding: 20px;
    border-radius: 50px;
    background-color: ${COLOR.gray500};
  `
};

const Input = ({
  placeholder,
  onKeyPressEnter,
  comment,
  setComment
}: {
  placeholder: string
  onKeyPressEnter: (e: KeyboardEvent<HTMLElement>) => void
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
}) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <S.Input
      placeholder={placeholder}
      onChange={handleChangeInput}
      onKeyDown={onKeyPressEnter}
      value={comment}
    />
  );
};

export default Input;
