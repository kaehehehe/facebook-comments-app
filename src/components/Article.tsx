import React, { type KeyboardEvent, useState, useLayoutEffect } from 'react';
import { GoComment } from 'react-icons/go';
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Input from './Input';
import ImgArticle from '../assets/images/img_post.jpg';
import COLOR from '../themes/color';
import { Text } from '../themes/element';
import Comments from './Comments';
import { type Comment } from '../interface';
import Like from './Like';

const S = {
  Article: styled.div`
    display: flex;
    flex-direction: column;
    width: 648px;
    height: 100vh;
    margin: 10px 0;
    padding: 8px;
    background-color: ${COLOR.white};
    border-radius: 12px;
    border: 1px solid ${COLOR.gray200};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    overflow: hidden;
  `,
  Image: styled.img`
    width: 100%;
    height: fit-content;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    align-items: center;
    height: 44px;
    border: 1px solid ${COLOR.gray200};
  `,
  Button: styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0;
    border-radius: 3px;
    cursor: pointer;

    :hover {
      background-color: ${COLOR.gray400};
    }
  `
};

const Article = () => {
  const [isLike, setIsLike] = useState(false);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  console.log(isOpenCommentModal);

  useLayoutEffect(() => {
    const comments = localStorage.getItem('comments');

    if (comments === null) {
      localStorage.setItem('comments', JSON.stringify([]));
    } else {
      setComments(JSON.parse(comments));
    }
  }, []);

  const handleClickComment = () => {
    setIsOpenCommentModal(true);
  };

  const handleClickLikeButton = () => {
    setIsLike((prev) => !prev);
  };

  const onAddComment = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      const updateComment = [
        ...comments,
        {
          id: uuidv4(),
          like: false,
          replies: [],
          text: newComment
        }
      ];

      setComments(updateComment);
      setNewComment('');
      localStorage.setItem('comments', JSON.stringify(updateComment));
    }
  };

  return (
    <S.Article>
      <S.Image
        src={ImgArticle}
        alt="posting"
      />
      {isLike && <Like />}
      <S.ButtonWrapper>
        <S.Button onClick={handleClickLikeButton}>
          {isLike
            ? (
              <RiThumbUpFill
                size="20"
                color={isLike ? COLOR.blue : COLOR.gray300}
              />
            )
            : (
              <RiThumbUpLine
                size="20"
                color={isLike ? COLOR.blue : COLOR.gray300}
              />
            )}
          <Text
            color={isLike ? COLOR.blue : COLOR.gray300}
            padding="0 0 0 8px"
          >
            좋아요
          </Text>
        </S.Button>
        <S.Button onClick={handleClickComment}>
          <GoComment
            size="20"
            color={COLOR.gray300}
          />
          <Text
            color={COLOR.gray300}
            padding="0 0 0 8px"
          >
            댓글 달기
          </Text>
        </S.Button>
      </S.ButtonWrapper>

      {comments.length > 0 &&
        <Comments
        comments={comments}
        setComments={setComments}
        />
      }

      <Input
        placeholder='댓글을 입력하세요...'
        onKeyPressEnter={onAddComment}
        comment={newComment}
        setComment={setNewComment}
      />
    </S.Article>
  );
};

export default Article;
