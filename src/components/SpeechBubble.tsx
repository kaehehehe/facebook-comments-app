import React from 'react';
import styled from 'styled-components';
import { type Comment } from '../interface';
import COLOR from '../themes/color';
import { Text } from '../themes/element';

const S = {
  SpeechBubble: styled.div`
    z-index: 100;
    position: relative;
    display: inline-block;
    min-width: 120px;
    max-width: 100%;
    margin: 1.5em 0;
    padding: 7px 10px;
    background: ${COLOR.white};
    -webkit-filter:drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2));
    -moz-filter:drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2));
    -ms-filter:drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2));
    filter:drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2));

    ::before {
      content: "";
      position: absolute;
      top: -30px;
      left: 50%;
      margin-left: -15px;
      border: 15px solid transparent;
      border-bottom: 15px solid ${COLOR.white};
    }
  `
};

const SpeechBubble = ({
  id,
  comments,
  setComments
}:
  {
    id: string
    comments: Comment[]
    setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>
  }
) => {
  const handleClickDeleteButton = (id: string) => () => {
    const updateComments = comments.filter(comment => comment.id !== id);

    setComments(updateComments);
    localStorage.setItem('comments', JSON.stringify(updateComments));
  };

  return (
    <S.SpeechBubble onClick={handleClickDeleteButton(id)}>
      <Text>삭제</Text>
    </S.SpeechBubble>
  );
};

export default SpeechBubble;
