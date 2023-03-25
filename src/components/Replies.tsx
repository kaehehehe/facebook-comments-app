import React, { useState } from 'react';
import styled from 'styled-components';

import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { type Comment, type Reply } from '../interface';
import COLOR from '../themes/color';
import ImgAvatar from '../assets/images/img_avatar.png';
import { Text } from '../themes/element';
import Like from './Like';
import SpeechBubble from './SpeechBubble';

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 10px 50px;
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
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    border: 1px solid ${COLOR.gray400};
  `,
  Comment: styled.div`
    position: relative;
    width: max-content;
    padding: 10px;
    border-radius: 30px;
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
  `
};

const Replies = ({
  replies,
  comments,
  setComments
}:
  {
    replies: Reply[]
    comments: Comment[]
    setComments: React.Dispatch<React.SetStateAction<Comment[] | []>>
  }
) => {
  const [showDotsIcon, setShowDotsIcon] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [mouseEnterCommentId, setMouseEnterCommentId] = useState<string | null>(null);

  const handleMouseEnterComment = (id: string) => () => {
    setShowDotsIcon(true);
    setMouseEnterCommentId(id);
  };

  const handleMouseLeaveComment = () => {
    setShowDotsIcon(false);
    setShowSpeechBubble(false);
  };

  const handleClickLikeButton = (id: string, commentId: string) => () => {
    const updateComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map(replay => {
            if (replay.id === id) {
              return {
                ...replay,
                like: !replay.like
              };
            } else {
              return replay;
            }
          })
        };
      } else {
        return comment;
      }
    });

    setComments(updateComments);
    localStorage.setItem('comments', JSON.stringify(updateComments));
  };

  const handleClickReplyButton = () => {

  };

  const renderReplies = replies.map((reply) => {
    const { id, commentId, text, like } = reply;

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
                    commentId={commentId}
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

          <button onClick={handleClickLikeButton(id, commentId)}>
            <Text
              fontSize={12}
              padding="0 10px 0 0"
              color={like ? COLOR.blue : COLOR.gray300}
            >
              좋아요
            </Text>
          </button>

          <button onClick={handleClickReplyButton}>
            <Text
              fontSize={12}
              color={COLOR.gray300}
            >
              답글 달기
            </Text>
          </button>

        </S.ButtonWrapper>

      </S.Container >
    );
  });
  return (
    <>
      {renderReplies}
    </>
  );
};

export default Replies;
