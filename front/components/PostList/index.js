import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Modal, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import PostDetail from '../PostDetail';
import { LOAD_TYPE_POSTS_REQUEST, LOAD_EXPLORE_POSTS_REQUEST, LOAD_HASHTAG_POSTS_REQUEST, REMOVE_POSTS, LOAD_POST_REQUEST } from '../../reducers/post';
import PostCard from './PostCard';
import { Loading } from './style';
import { Global } from '../PostDetail/style';

const PostList = ({ type, paramData }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePosts, loadPostsLoading, loadPostDone, singlePost } = useSelector((state) => state.post);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: REMOVE_POSTS,
    });

    if (type === 'explore') {
      dispatch({
        type: LOAD_EXPLORE_POSTS_REQUEST,
      });
    } else if (type === 'hashtag') {
      dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: paramData,
      });
    } else {
      dispatch({
        type: LOAD_TYPE_POSTS_REQUEST,
        data: {
          type,
          username: paramData,
        },
      });
    }
  }, [type]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          if (type === 'explore') {
            dispatch({
              type: LOAD_EXPLORE_POSTS_REQUEST,
              lastId,
            });
          } else if (type === 'hashtag') {
            dispatch({
              type: LOAD_HASHTAG_POSTS_REQUEST,
              lastId,
            });
          } else {
            dispatch({
              type: LOAD_TYPE_POSTS_REQUEST,
              lastId,
              data: {
                type,
                username: paramData,
              },
            });
          }
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
          {loadPostDone && (<PostDetail post={singlePost} mode="post" />)}
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
  paramData: PropTypes.string.isRequired,
};

export default PostList;
