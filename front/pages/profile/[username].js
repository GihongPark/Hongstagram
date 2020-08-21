import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Row, Col, Avatar, Button, Tabs, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../../components/AppLayout';
import PostList from '../../components/PostList';
import UserList from '../../components/UserList';
import {
  LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST, LOG_OUT_REQUEST, FOLLOW_REQUEST, UNFOLLOW_REQUEST, UPLOAD_PROFILE_IMAGE_REQUEST, REMOVE_PROFILE_IMAGE_REQUEST, REMOVE_USER_LIST,
} from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { UserInfo, ProfileImageButton, ProfileImageDiv, ProfileInfo, Global, ListWrapper, SettingButton, ProfileImageHeader, ProfileImageAction } from '../../style/profile';
import { FlexColumn } from '../../components/AppLayout/style';
import { NormalButton } from '../../components/PostDetail/style';

const { TabPane } = Tabs;

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { username } = router.query;
  const {
    me, userInfo, loadUserError, logOutLoading, uploadProfileImageDone, removeProfileImageDone,
  } = useSelector((state) => state.user);
  const [type, setType] = useState('posts');
  const [profileImageVisible, setProfileImageVisible] = useState(false);
  const [userListVisible, setUserListVisible] = useState(false);
  const [userListType, setUserListType] = useState('');
  const imageInput = useRef();

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
  useEffect(() => {
    if (uploadProfileImageDone || removeProfileImageDone) {
      setProfileImageVisible(false);
    }
  }, [uploadProfileImageDone, removeProfileImageDone]);

  const onChangeImages = useCallback((e) => {
    if (userInfo?.id === me?.id) {
      const imageFormData = new FormData();
      imageFormData.append('image', e.target.files[0]);
      dispatch({
        type: UPLOAD_PROFILE_IMAGE_REQUEST,
        data: imageFormData,
      });
    }
  });
  const onProfileUpload = useCallback(() => {
    if (userInfo?.id === me?.id) {
      imageInput.current.click();
    }
  }, [imageInput.current]);
  const onProfileDelete = useCallback(() => {
    if (userInfo?.id === me?.id) {
      dispatch({
        type: REMOVE_PROFILE_IMAGE_REQUEST,
      });
    }
  });
  const onProfileEdit = useCallback(() => {
    router.push('/profile/edit');
  });
  const onPopupProfileImage = useCallback(() => {
    setProfileImageVisible(true);
  });
  const onCancel = useCallback(() => {
    setProfileImageVisible(false);
  });

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
  const showUserList = useCallback((param) => () => {
    setUserListVisible(true);
    setUserListType(param);
  });
  const hideUserList = useCallback(() => {
    setUserListVisible(false);
    setUserListType('');
    dispatch({
      type: REMOVE_USER_LIST,
    });
  });

  const onChangeTab = useCallback((key) => {
    setType(key);
  }, [type]);

  return (
    <>
      <Head>
        <title>@{username} • Hongstagram</title>
      </Head>
      <AppLayout>
        <FlexColumn>
          <Global />
          <UserInfo>
            <div className="wrapper">
              <Row>
                <Col xs={8}>
                  {userInfo?.id === me?.id && (
                    <>
                      <ProfileImageButton onClick={onPopupProfileImage}>
                        <Row>
                          <Col xs={24} lg={0}>
                            {
                              userInfo?.src
                                ? <Avatar src={`${userInfo?.src}`} size={77} />
                                : <Avatar icon={<UserOutlined />} size={77} />
                            }
                          </Col>
                          <Col xs={0} lg={24}>
                            {
                              userInfo?.src
                                ? <Avatar src={`${userInfo?.src}`} size={150} />
                                : <Avatar icon={<UserOutlined />} size={150} />
                            }
                          </Col>
                        </Row>
                      </ProfileImageButton>
                      <Modal
                        visible={profileImageVisible}
                        onCancel={onCancel}
                        footer={null}
                        width="400px"
                        bodyStyle={{ padding: '0' }}
                        closable={false}
                      >
                        <ProfileImageHeader>프로필 사진 바꾸기</ProfileImageHeader>
                        <ProfileImageAction>
                          <input type="file" name="image" hidden ref={imageInput} onChange={onChangeImages} />
                          <NormalButton style={{ color: '#0095f6', fontWeight: 600 }} onClick={onProfileUpload}>사진 업로드</NormalButton>
                          <NormalButton style={{ color: '#ed4956', fontWeight: 600 }} onClick={onProfileDelete}>현재 사진 삭제</NormalButton>
                          <NormalButton onClick={onCancel}>취소</NormalButton>
                        </ProfileImageAction>
                      </Modal>
                    </>
                  )}
                  {userInfo?.id !== me?.id && (
                    <ProfileImageDiv>
                      <Row>
                        <Col xs={24} lg={0}>
                          {
                            userInfo?.src
                              ? <Avatar src={`${userInfo?.src}`} size={77} />
                              : <Avatar icon={<UserOutlined />} size={77} />
                          }
                        </Col>
                        <Col xs={0} lg={24}>
                          {
                            userInfo?.src
                              ? <Avatar src={`${userInfo?.src}`} size={150} />
                              : <Avatar icon={<UserOutlined />} size={150} />
                          }
                        </Col>
                      </Row>
                    </ProfileImageDiv>
                  )}
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
                                <Button className="lg" onClick={onProfileEdit}>프로필 편집</Button>
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
                              ? <Button className="xs" onClick={onProfileEdit}>프로필 편집</Button>
                              // : <Button className="xs">메시지 보내기</Button>
                              : <></>
                          }
                        </SettingButton>
                      </Col>
                      <Col xs={0} lg={24}>
                        <ul>
                          <li>게시물 <span>{userInfo?.Posts}</span></li>
                          <li><Button type="text" onClick={showUserList('follower')}>팔로워 {userInfo?.Followers}</Button></li>
                          <li><Button type="text" onClick={showUserList('follow')}>팔로우 {userInfo?.Follows}</Button></li>
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
                <Button type="text" onClick={showUserList('follower')}>
                  <div>팔로워</div>
                  <strong>{userInfo?.Followers}</strong>
                </Button>
              </Col>
              <Col xs={8} lg={0}>
                <Button type="text" onClick={showUserList('follow')}>
                  <div>팔로우</div>
                  <strong>{userInfo?.Follows}</strong>
                </Button>
              </Col>
            </ListWrapper>
            <UserList type={userListType} paramData={username} visible={userListVisible} onCancel={hideUserList} />
          </UserInfo>
          <div>
            <Tabs defaultActiveKey="1" tabBarGutter={52} onChange={onChangeTab} centered>
              <TabPane tab="게시물" key="posts" />
              {userInfo?.id === me?.id ? <TabPane tab="저장됨" key="bookmark" /> : null}
              <TabPane tab="태그됨" key="tag" />
            </Tabs>
            <PostList type={type} paramData={username} />
          </div>
        </FlexColumn>
      </AppLayout>
    </>
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
