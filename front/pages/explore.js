import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import PostList from '../components/PostList';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { Global } from '../style/profile';
import { FlexColumn } from '../components/AppLayout/style';

const Explore = () => {
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me || !me.id) {
      router.replace('/login');
    }
  }, [me, me?.id]);

  return (
    <AppLayout>
      <FlexColumn>
        <Global />
        <PostList type="explore" paramData="" />
      </FlexColumn>
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

export default Explore;
