import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Avatar, Modal } from 'antd';
import { HeartOutlined, MessageOutlined, StarOutlined, HeartTwoTone, StarTwoTone, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { Global, NormalButton, Content, Action, List, Like, CommentList, CommentInput, CommentButton } from './style';
import useInput from '../../hooks/useInput';
import Comment from './Comment';
import { ADD_COMMENT_REQUEST, ADD_LIKE_REQUEST, REMOVE_LIKE_REQUEST, REMOVE_BOOKMARK_REQUEST, ADD_BOOKMARK_REQUEST } from '../../reducers/post';
import PostDetail from './';
import { backUrl } from '../../config/config';

const Contents = ({ post, mode }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);
  const [comment, onChangeComment, setComment] = useInput('');
  const commentInput = useRef();
  const [style, setStyle] = useState({});
  const [visible, setVisible] = useState(false);

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
    if (!post.commentAllow) {
      setStyle({ display: 'flex' });
      commentInput.current.focus();
    }
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
  const showModal = useCallback(() => {
    setVisible(true);
  });
  const onCancel = useCallback(() => {
    setVisible(false);
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
            <span>{ post.Likers.length }</span>
            <span> 개</span>
          </NormalButton>
        </Like>
      </Action>
      <CommentList className={mode}>
        <ul className="root">
          {mode === 'list' && (
            <>
              {post.content !== '' && (
                <li>
                  <Link href={`/profile/${post.User.username}`}><a><h3>{post.User.username}</h3></a></Link>{post.content}
                </li>
              )}
              {post.Comments.length > 2 && (
                <>
                  <NormalButton onClick={showModal}>댓글 {post.Comments.length}개 모두 보기</NormalButton>
                  <Modal
                    visible={visible}
                    onCancel={onCancel}
                    footer={null}
                    width="100%"
                    bodyStyle={{ padding: '0' }}
                  >
                    <Global />
                    <PostDetail post={post} loading mode="post" />
                  </Modal>
                </>
              )}
              {post.Comments[0] && (
                <li>
                  <Link href={`/profile/${post.Comments[0].User.username}`}><a><h3>{post.Comments[0].User.username}</h3></a></Link>{post.Comments[0].content}
                </li>
              )}
              {post.Comments[1] && (
                <li>
                  <Link href={`/profile/${post.Comments[1].User.username}`}><a><h3>{post.Comments[1].User.username}</h3></a></Link>{post.Comments[1].content}
                </li>
              )}
            </>
          )}
          {mode === 'post' && (
            <>
              <li>
                <Link href={`/profile/${post.User.username}`}>
                  <a>
                    {
                      post.User.src
                        ? <Avatar src={`${backUrl}/${post.User.src}`} size={32} />
                        : <Avatar icon={<UserOutlined />} size={32} />
                    }
                  </a>
                </Link>
                <div className="content">
                  <Link href={`/profile/${post.User.username}`}><a style={{ color: '#222' }}><h3>{post.User.username}</h3></a></Link> {post.content}
                </div>
              </li>
              {post.Comments.map((c) => (
                <Comment key={c.id} comment={c} />
              ))}
            </>
          )}
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
  mode: PropTypes.string.isRequired,
};

export default Contents;
