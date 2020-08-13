import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { HeartOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

import { NormalButton, Content, Action, List, Like, CommentList, CommentInput, CommentButton } from './style';
import useInput from '../../hooks/useInput';
import Comment from './Comment';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';

const Contents = ({ post, done, mode }) => {
  const dispatch = useDispatch();
  const { addCommentDone } = useSelector((state) => state.post);
  const [comment, onChangeComment, setComment] = useInput('');
  const commentInput = useRef();
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (addCommentDone) {
      setComment('');
    }
  }, [addCommentDone]);
  const onComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: comment, postId: post.id },
    });
  });
  const focusComment = useCallback(() => {
    setStyle({ display: 'flex' });
    commentInput.current.focus();
  });
  const toggleLike = useCallback(() => {
    console.log('like');
  });
  const toggleBookmark = useCallback(() => {
    console.log('bookmark');
  });
  const showLike = useCallback(() => {
    console.log('like');
  });

  return (
    <Content className={mode}>
      <Action className={mode}>
        <List>
          <li><NormalButton onClick={toggleLike}><HeartOutlined /></NormalButton></li>
          <li><NormalButton onClick={focusComment}><MessageOutlined /></NormalButton></li>
          <li><NormalButton onClick={toggleBookmark}><StarOutlined /></NormalButton></li>
        </List>
        <Like>
          <NormalButton onClick={showLike}>
            <span>좋아요 </span>
            <span>{ done ? post.Likers.length : 0 }</span>
            <span> 개</span>
          </NormalButton>
        </Like>
      </Action>
      <CommentList className={mode}>
        <ul className="root">
          {mode === 'post' && post.Comments.map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
        </ul>
      </CommentList>
      <CommentInput style={style}>
        <Input.TextArea
          value={comment}
          onChange={onChangeComment}
          maxLength={500}
          rows={1}
          placeholder="댓글 달기.."
          bordered={false}
          ref={commentInput}
        />
        <CommentButton style={{ color: '#0095f6' }} onClick={onComment}>게시</CommentButton>
      </CommentInput>
    </Content>
  );
};

Contents.propTypes = {
  post: PropTypes.object.isRequired,
  done: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
};

export default Contents;
