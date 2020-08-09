import React, { useEffect, useCallback } from 'react';
import { Row, Col, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../../components/AppLayout';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST, LOG_OUT_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { UserInfo, ProfileImageButton, ProfileInfo } from '../../style/profile';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me, userInfo, loadUserError, logOutLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me || !me.id) {
      router.replace('/login');
    }
  }, [me, me?.id]);
  useEffect(() => {
    if (loadUserError) {
      alert(loadUserError);
      router.back();
    }
  }, [loadUserError]);

  const onPopupProfileImage = useCallback(() => {
    // TODO: 프로필 이미지 변경 팝업 생성
  }, []);

  const onLogOut = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <AppLayout>
      <UserInfo>
        <Row>
          <Col xs={8}>
            <ProfileImageButton onClick={onPopupProfileImage}>
              <Avatar src={userInfo?.src} icon={<UserOutlined />} size={150} />
            </ProfileImageButton>
          </Col>
          <Col xs={16}>
            <ProfileInfo>
              <div>
                <h2>{userInfo?.username}</h2>
                {
                  userInfo?.id === me?.id
                    ? (
                      <>
                        <Button>프로필 편집</Button>
                        <Button type="primary" onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
                      </>
                    )
                    : (
                      <>
                        <Button>메시지 보내기</Button>
                        <Button type="primary">팔로우</Button>
                      </>
                    )
                }
              </div>
              <ul>
                <li>게시물 <span>{userInfo.Posts}</span></li>
                <li><Button type="text">팔로워 <span>{userInfo.Followers}</span></Button></li>
                <li><Button type="text">팔로우 <span>{userInfo.Follows}</span></Button></li>
              </ul>
              <div>
                <h1>{userInfo.name}</h1>
              </div>
            </ProfileInfo>
          </Col>
        </Row>
      </UserInfo>
      {/* <TabBar /> */}
      {/* <PostList /> */}
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
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.username,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
