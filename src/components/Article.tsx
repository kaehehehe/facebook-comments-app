import React, { type KeyboardEvent, useState, useLayoutEffect } from 'react';
import { GoComment } from 'react-icons/go';
import { RiThumbUpLine, RiThumbUpFill } from 'react-icons/ri';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Input from './Input';
import ImgArticle from '../assets/images/img_post.jpeg';
import COLOR from '../themes/color';
import { Text } from '../themes/element';
import Comments from './Comments';
import { type Comment } from '../interface';
import Like from './Like';
import ImgAvatar from '../assets/images/img_avatar.png';

const S = {
  Article: styled.div`
    display: flex;
    flex-direction: column;
    width: 648px;
    height: auto;
    margin: 10px 0;
    padding: 8px;
    background-color: ${COLOR.white};
    border-radius: 12px;
    border: 1px solid ${COLOR.gray200};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  `,
  AvatarWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  `,
  Avatar: styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid ${COLOR.gray400};
    object-fit: contain:
  `,
  Image: styled.img`
    width: 100%;
    height: fit-content;
    margin-top: 10px;
  `,
  PostMetadata: styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  `,
  CommentWrapper: styled.div`
    overflow-y: auto;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    align-items: center;
    height: 44px;
    margin-bottom: 10px;
    border-top: 1px solid ${COLOR.gray200};
    border-bottom: 1px solid ${COLOR.gray200};
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
  `,
  InputWrapper: styled.div`
    margin-top: 20px;
  `
};

const Article = () => {
  const [isLike, setIsLike] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useLayoutEffect(() => {
    const comments = localStorage.getItem('comments');

    if (comments === null) {
      localStorage.setItem('comments', JSON.stringify([]));
    } else {
      setComments(JSON.parse(comments));
    }
  }, []);

  const handleClickLikeButton = () => {
    setIsLike((prev) => !prev);
  };

  const onAddComment = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (newComment.trim() === '') {
        return;
      }

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
      <S.AvatarWrapper>
        <S.Avatar
          src={ImgAvatar}
          alt="avatar"
        />
        <Text
          fontSize={16}
          fontWeight={500}
          padding="0 0 0 5px"
        >
          카에
        </Text>
      </S.AvatarWrapper>
      <Text
        fontSize={24}
        fontWeight={500}
      >
        벚꽃이 피었어요~
      </Text>
      <S.Image
        src={ImgArticle}
        alt="posting"
      />
      <S.PostMetadata>
        <div>
          {isLike && <Like />}
        </div>

        <Text
          fontSize={16}
          color={COLOR.gray300}
        >
          댓글 {comments.length} 개
        </Text>
      </S.PostMetadata>
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
        <S.Button>
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

      <S.CommentWrapper>

      {comments.length > 0 &&
        <Comments
        comments={comments}
        setComments={setComments}
        />
      }

        <S.InputWrapper>
          <Input
            placeholder='댓글을 입력하세요...'
            onKeyPressEnter={onAddComment}
            comment={newComment}
            setComment={setNewComment}
          />
        </S.InputWrapper>

      </S.CommentWrapper>

    </S.Article>
  );
};

export default Article;
