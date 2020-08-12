import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Input, Skeleton, Empty } from 'antd';
import { HeartOutlined, MessageOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Slick from 'react-slick';

import { LOAD_POST_REQUEST } from '../../reducers/post';
import {
  Global,
  Header, UserName,
  PostImage,
  PostWrapper, PostAction, List, Like,
  NormalButton,
  Comment, CommentInput, CommentButton,
} from './style';
import SlickGlobal from '../../style/slick';
import { backUrl } from '../../config/config';
import useInput from '../../hooks/useInput';

const PostDetail = ({ postId }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { singlePost, loadPostDone } = useSelector((state) => state.post);
  const [comment, onChangeComment, setComment] = useInput('');

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: postId,
    });
  }, [postId]);

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

  if (!singlePost) {
    return null;
  }
  return (
    <>
      <SlickGlobal />
      <Global />
      <article className="wrapper">
        <Header>
          {
            loadPostDone
              ? (
                <>
                  <Avatar src={singlePost.User.src} icon={<UserOutlined />} size={32} />
                  <UserName>
                    <span>{singlePost.User.username}</span>
                    {singlePost.User.id && (
                      <span> • <NormalButton type="text">팔로잉</NormalButton></span>
                    )}
                  </UserName>
                </>
              ) : <Skeleton avatar active paragraph={{ rows: 0 }} />
          }
        </Header>
        <PostImage>
          {
            loadPostDone
              ? (
                <>
                  <Slick
                    initialSlide={0}
                    slidesToShow={1}
                    slidesToScroll={1}
                    adaptiveHeight
                  >
                    {
                      singlePost.Images.map((image) => (
                        <div key={image.src}>
                          <img
                            src={`${backUrl}/${image.src}`}
                            style={{ width: '100%' }}
                            alt={image.src}
                          />
                        </div>
                      ))
                    }
                  </Slick>
                </>
              ) : <Empty />
          }
        </PostImage>
        <PostWrapper>
          <Comment>
            <ul className="root">
              <li>
                <div>댓글 1</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 2</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 3</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 1</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 2</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 3</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 1</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 2</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
              <li>
                <div>댓글 3</div>
                <ul>
                  <li>대댓글1</li>
                  <li>대댓글2</li>
                </ul>
              </li>
            </ul>
          </Comment>
          <PostAction>
            <List>
              <li><NormalButton onClick={toggleLike}><HeartOutlined /></NormalButton></li>
              <li><NormalButton onClick={focusComment}><MessageOutlined /></NormalButton></li>
              <li><NormalButton onClick={toggleBookmark}><StarOutlined /></NormalButton></li>
            </List>
            <Like>
              <NormalButton onClick={showLike}>
                <span>좋아요 </span>
                <span>{ loadPostDone ? singlePost.Likers.length : 0 }</span>
                <span> 개</span>
              </NormalButton>
            </Like>
          </PostAction>
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
        </PostWrapper>
      </article>
    </>
  );
};

PostDetail.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default PostDetail;
