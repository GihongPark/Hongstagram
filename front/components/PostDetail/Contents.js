import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Avatar } from 'antd';
import { HeartOutlined, MessageOutlined, StarOutlined, HeartTwoTone, StarTwoTone, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { NormalButton, Content, Action, List, Like, CommentList, CommentInput, CommentButton } from './style';
import useInput from '../../hooks/useInput';
import Comment from './Comment';
import { ADD_COMMENT_REQUEST, ADD_LIKE_REQUEST, REMOVE_LIKE_REQUEST, REMOVE_BOOKMARK_REQUEST, ADD_BOOKMARK_REQUEST } from '../../reducers/post';

const Contents = ({ post, done, mode }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);
  const [comment, onChangeComment, setComment] = useInput('');
  const commentInput = useRef();
  const [style, setStyle] = useState({});
  const isLiked = post.Likers.find((v) => v.id === me.id);
  const isBookmarked = post.Bookmarkers.find((v) => v.id === me.id);

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
    if (isLiked) {
      // 언라이크
      dispatch({
        type: REMOVE_LIKE_REQUEST,
        data: post.id,
      });
    } else {
      // 라이크
      dispatch({
        type: ADD_LIKE_REQUEST,
        data: post.id,
      });
    }
  });
  const toggleBookmark = useCallback(() => {
    if (isBookmarked) {
      // 언라이크
      dispatch({
        type: REMOVE_BOOKMARK_REQUEST,
        data: post.id,
      });
    } else {
      // 라이크
      dispatch({
        type: ADD_BOOKMARK_REQUEST,
        data: post.id,
      });
    }
  });
  const showLike = useCallback(() => {
    console.log('like');
  });

  return (
    <Content className={mode}>
      <Action className={mode}>
        <List>
          <li>
            <NormalButton onClick={toggleLike}>
              {isLiked ? <HeartTwoTone twoToneColor="#ed4956" /> : <HeartOutlined />}
            </NormalButton>
          </li>
          <li><NormalButton onClick={focusComment}><MessageOutlined /></NormalButton></li>
          <li>
            <NormalButton onClick={toggleBookmark}>
              {isBookmarked ? <StarTwoTone twoToneColor="#ffd700" /> : <StarOutlined />}
            </NormalButton>
          </li>
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
          <li>
            <Link href={`/profile/${post.User.username}`}><a><Avatar src={post.User.src} icon={<UserOutlined />} size={32} /></a></Link>
            <div className="content"><h3>{post.User.username}</h3> {post.content}</div>
          </li>
          {mode === 'post' && post.Comments.map((c) => (
            <Comment key={c.id} comment={c} />
          ))}
        </ul>
      </CommentList>
      {!post.commentAllow && (
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
      )}
    </Content>
  );
};

Contents.propTypes = {
  post: PropTypes.object.isRequired,
  done: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
};

export default Contents;
