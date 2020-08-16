import React, { useEffect, useCallback, useState } from 'react';
import { Row, Col, Avatar, Button, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../../components/AppLayout';
import PostList from '../../components/PostList';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST, LOG_OUT_REQUEST, FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { UserInfo, ProfileImageButton, ProfileInfo, Global, ListWrapper, SettingButton } from './style';
import { FlexColumn } from '../../components/AppLayout/style';

const { TabPane } = Tabs;

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = router.query;
  const { me, userInfo, loadUserError, logOutLoading } = useSelector((state) => state.user);
  const [type, setType] = useState('posts');

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
  });
  const onFollow = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: userInfo.id,
    });
  });
  const onUnFollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: userInfo.id,
    });
  });

  const onChangeTab = useCallback((key) => {
    setType(key);
  }, [type]);

  return (
    <AppLayout>
      <FlexColumn>
        <Global />
        <UserInfo>
          <div className="wrapper">
            <Row>
              <Col xs={8}>
                <ProfileImageButton onClick={onPopupProfileImage}>
                  <Row>
                    <Col xs={24} lg={0}>
                      <Avatar src={userInfo?.src} icon={<UserOutlined />} size={77} />
                    </Col>
                    <Col xs={0} lg={24}>
                      <Avatar src={userInfo?.src} icon={<UserOutlined />} size={150} />
                    </Col>
                  </Row>
                </ProfileImageButton>
              </Col>
              <Col xs={16}>
                <ProfileInfo>
                  <div>
                    <h2>{userInfo?.username}</h2>
                    <SettingButton>
                      {
                        userInfo?.id === me?.id
                          ? (
                            <>
                              <Button className="lg">프로필 편집</Button>
                              <Button type="primary" onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
                            </>
                          )
                          : (
                            <>
                              {/* <Button className="lg">메시지 보내기</Button> */}
                              {userInfo.isFollow ? <Button onClick={onUnFollow}>언팔로우</Button> : <Button type="primary" onClick={onFollow}>팔로우</Button> }
                            </>
                          )
                      }
                    </SettingButton>
                  </div>
                  <Row>
                    <Col xs={24} lg={0}>
                      <SettingButton>
                        {
                          userInfo?.id === me?.id
                            ? <Button className="xs">프로필 편집</Button>
                            : <Button className="xs">메시지 보내기</Button>
                        }
                      </SettingButton>
                    </Col>
                    <Col xs={0} lg={24}>
                      <ul>
                        <li>게시물 <span>{userInfo?.Posts}</span></li>
                        <li><Button type="text">팔로워 <span>{userInfo?.Followers}</span></Button></li>
                        <li><Button type="text">팔로우 <span>{userInfo?.Follows}</span></Button></li>
                      </ul>
                    </Col>
                    <Col xs={0} lg={24}>
                      <h1>{userInfo?.name}</h1>
                    </Col>
                  </Row>
                </ProfileInfo>
              </Col>
            </Row>
          </div>
          <ListWrapper>
            <Col xs={8} lg={0}>
              <div>게시물</div>
              <strong>{userInfo?.Posts}</strong>
            </Col>
            <Col xs={8} lg={0}>
              <Button type="text">
                <div>팔로워</div>
                <strong>{userInfo?.Followers}</strong>
              </Button>
            </Col>
            <Col xs={8} lg={0}>
              <Button type="text">
                <div>팔로우</div>
                <strong>{userInfo?.Follows}</strong>
              </Button>
            </Col>
          </ListWrapper>
        </UserInfo>
        <div>
          <Tabs defaultActiveKey="1" tabBarGutter={52} onChange={onChangeTab} centered>
            <TabPane tab="게시물" key="posts" />
            {userInfo?.id === me?.id ? <TabPane tab="저장됨" key="bookmark" /> : null}
            <TabPane tab="태그됨" key="tag" />
          </Tabs>
          <PostList type={type} username={username} />
        </div>
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
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.username,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Profile;
