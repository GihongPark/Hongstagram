import React, { useEffect, useMemo } from 'react';
import { Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import PostDetail from '../components/PostDetail';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import { Loading } from '../components/PostList/style';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const {
    mainPosts, hasMorePosts, loadPostsLoading, loadPostsDone,
  } = useSelector((state) => state.post);
  const style = useMemo(() => ({ maxWidth: '600px', width: '90%' }));

  useEffect(() => {
    if (!me || !me.id) {
      Router.replace('/login');
    }
  }, [me, me?.id]);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 1600
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  if (!me || !me.id) {
    return null;
  }
  return (
    <AppLayout>
      <div style={style}>
        {mainPosts.map((post) => (
          <PostDetail key={post.id} post={post} mode="list" />
        ))}
        {!loadPostsLoading && mainPosts.length === 0 && (
          <Empty style={{ marginTop: '100px' }} description="게시물을 올려주세요" />
        )}
        {loadPostsLoading && (
          <Loading>
            <LoadingOutlined />
          </Loading>
        )}
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
