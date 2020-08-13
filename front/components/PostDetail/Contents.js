import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { HeartOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

import { NormalButton, Content, Action, List, Like, CommentList, CommentInput, CommentButton } from './style';
import useInput from '../../hooks/useInput';
import Comment from './Comment';

const Contents = ({ like, comments, done, mode }) => {
  const [comment, onChangeComment, setComment] = useInput('');

  const onComment = useCallback(() => {

  });
  const focusComment = useCallback(() => {
    console.log('comment');
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
            <span>{ done ? like : 0 }</span>
            <span> 개</span>
          </NormalButton>
        </Like>
      </Action>
      <CommentList className={mode} />
      <CommentInput>
        <Input.TextArea
          value={comment}
          onChange={onChangeComment}
          maxLength={500}
          rows={1}
          placeholder="댓글 달기.."
          bordered={false}
        />
        <CommentButton style={{ color: '#0095f6' }} onClick={onComment}>게시</CommentButton>
      </CommentInput>
    </Content>
  );
};

Contents.propTypes = {
  like: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  done: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
};

export default Contents;
