import React, { type KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

import { type Comment } from '../interface';
import COLOR from '../themes/color';
import { Text } from '../themes/element';
import ImgAvatar from '../assets/images/img_avatar.png';
import Like from './Like';
import SpeechBubble from './SpeechBubble';
import Replies from './Replies';
import Input from './Input';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  `,
  CommentAndDots: styled.div`
    display: flex;
    justify-content: space-between;
    width: max-content;
    align-items: center;
  `,
  CommentWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  `,
  Avatar: styled.img`
    width: 33px;
    height: 33px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid ${COLOR.gray400};
    object-fit: contain:
  `,
  Comment: styled.div`
    position: relative;
    width: max-content;
    padding: 10px;
    border-radius: 13px;
    background-color: ${COLOR.gray500};
  `,
  Like: styled.div`
    position: absolute;
    bottom: 5px;
    right: -14px;
  `,
  Dots: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    cursor: pointer;

    :hover {
      background-color: ${COLOR.gray400};
      border-radius: 50%;
    }
  `,
  ButtonWrapper: styled.div`
    display: flex;
  `,
  SpeechBubble: styled.div`
    position: absolute;
    bottom: -70px;
  `,
  InputWrapper: styled.div`
    margin-left: 50px;
  `
};

const Comments = ({
  comments,
  setComments
}: {
  comments: Comment[]
  setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>
}) => {
  const [showDotsIcon, setShowDotsIcon] = useState(false);
  const [mouseEnterCommentId, setMouseEnterCommentId] = useState<string | null>(null);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<string | null>(null);
  const [showReplayInputBox, setShowReplayInputBox] = useState(false);
  const [newReply, setNewReply] = useState('');

  console.log(showSpeechBubble);

  const handleClickLikeButton = (id: string, isLike: boolean) => () => {
    const updateComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, like: !comment.like };
      } else {
        return comment;
      }
    });

    setComments(updateComments);
    localStorage.setItem('comments', JSON.stringify(updateComments));
  };

  const handleMouseEnterComment = (id: string) => () => {
    setShowDotsIcon(true);
    setMouseEnterCommentId(id);
  };

  const handleMouseLeaveComment = () => {
    setShowDotsIcon(false);
    setShowSpeechBubble(false);
  };

  const handleClickReplyButton = (id: string) => () => {
    setTargetCommentId(id);
    setShowReplayInputBox(true);
  };

  const onAddReplay = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (newReply.trim() === '') {
        return;
      }

      const updateComments = comments.map(comment => {
        if (comment.id === targetCommentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: uuidv4(),
                commentId: targetCommentId,
                like: false,
                text: newReply
              }
            ]
          };
        } else {
          return comment;
        }
      });

      setComments(updateComments);
      localStorage.setItem('comments', JSON.stringify(updateComments));
      setNewReply('');
    }
  };

  const renderComments = comments.map((item) => {
    const { id, text, like, replies } = item;

    return (
      <S.Container
        key={id}
        onMouseEnter={handleMouseEnterComment(id)}
        onMouseLeave={handleMouseLeaveComment}
      >
        <S.CommentAndDots>

          <S.CommentWrapper>

            <S.Avatar
              src={ImgAvatar}
              alt="avatar"
            />

            <S.Comment>
              <Text fontSize={15}>
                {text}
              </Text>
              {like &&
                <S.Like>
                  <Like />
                </S.Like>
              }
            </S.Comment>

          </S.CommentWrapper>

          {showDotsIcon && mouseEnterCommentId === id &&
            <>
            <S.Dots onClick={() => { setShowSpeechBubble(!showSpeechBubble); }}>
                <BiDotsHorizontalRounded
                  size={18}
                  color={COLOR.gray300}
                />

                {showSpeechBubble &&
                  <S.SpeechBubble>
                    <SpeechBubble
                      id={id}
                      comments={comments}
                      setComments={setComments}
                    />
                  </S.SpeechBubble>
                }
              </S.Dots>
            </>
          }

        </S.CommentAndDots>

        <S.ButtonWrapper>

          <button onClick={handleClickLikeButton(id, like)}>
            <Text
              fontSize={12}
              padding="0 10px 0 0"
              color={like ? COLOR.blue : COLOR.gray300}
              fontWeight={500}
            >
              좋아요
            </Text>
          </button>

          <button onClick={handleClickReplyButton(id)}>
            <Text
              fontSize={12}
              color={COLOR.gray300}
              fontWeight={500}
            >
              답글 달기
            </Text>
          </button>

        </S.ButtonWrapper>

        {replies.length > 0 &&
          <Replies
            replies={replies}
            comments={comments}
            setComments={setComments}
          />}

        {id === targetCommentId && showReplayInputBox &&
          <S.InputWrapper>
            <Input
              placeholder='답글을 입력하세요...'
              comment={newReply}
              setComment={setNewReply}
              onKeyPressEnter={onAddReplay}
            />
          </S.InputWrapper>
        }
      </S.Container >
    );
  });

  return (
    <>
      {renderComments}
    </>
  );
};

export default Comments;
