import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_TYPE_POSTS_REQUEST, REMOVE_POSTS } from '../../reducers/post';
import PostCard from './PostCard';
import { Loading } from './style';

const PostList = ({ type, username }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: REMOVE_POSTS,
    });
    dispatch({
      type: LOAD_TYPE_POSTS_REQUEST,
      data: {
        type,
        username,
      },
    });
  }, [type]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_TYPE_POSTS_REQUEST,
            lastId,
            data: {
              type,
              username,
            },
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <article>
      <Row gutter={28}>
        {mainPosts.map((post) => (
          <Col key={post.id} xs={8}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
      {hasMorePosts && (
        <Loading>
          <LoadingOutlined />
        </Loading>
      )}
    </article>
  );
};

PostList.propTypes = {
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PostList;
