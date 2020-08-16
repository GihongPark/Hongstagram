import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import PostDetail from '../PostDetail';
import { LOAD_TYPE_POSTS_REQUEST, REMOVE_POSTS, LOAD_POST_REQUEST } from '../../reducers/post';
import PostCard from './PostCard';
import { Loading } from './style';
import { Global } from '../PostDetail/style';

const PostList = ({ type, username }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading, loadPostDone, singlePost } = useSelector((state) => state.post);
  const [visible, setVisible] = useState(false);

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
    setVisible(true);
    dispatch({
      type: LOAD_POST_REQUEST,
      data: id,
    });
  });
  const onCancel = useCallback(() => {
    setVisible(false);
  });
  return (
    <article>
      <Row gutter={28}>
        {
          mainPosts.length > 0
            ? mainPosts.map((post) => (
              <Col key={post.id} xs={8}>
                <PostCard post={post} showPost={showPost} />
              </Col>
            ))
            : <Col xs={24}><Empty /></Col>
        }
        <Modal
          visible={visible}
          onCancel={onCancel}
          footer={null}
          width="100%"
          bodyStyle={{ padding: '0' }}
        >
          <Global />
          <PostDetail post={singlePost} loading={loadPostDone} mode="post" />
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
