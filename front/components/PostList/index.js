import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import PostDetail from '../PostDetail';
import { LOAD_TYPE_POSTS_REQUEST, REMOVE_POSTS } from '../../reducers/post';
import PostCard from './PostCard';
import { Loading } from './style';

const PostList = ({ type, username }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const [visible, setVisible] = useState(false);
  const [postId, setPostId] = useState(0);

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

  const showPost = useCallback((id) => () => {
    setPostId(id);
    setVisible(true);
  });
  const onCancel = useCallback(() => {
    setVisible(false);
  });
  return (
    <article>
      <Row gutter={28}>
        {mainPosts.map((post) => (
          <Col key={post.id} xs={8}>
            <PostCard post={post} showPost={showPost} />
          </Col>
        ))}
        <Modal
          visible={visible}
          onCancel={onCancel}
          footer={null}
          width="100%"
          bodyStyle={{ padding: '0' }}
        >
          <PostDetail postId={postId} />
        </Modal>
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
