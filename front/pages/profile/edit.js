import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Avatar, Modal, Form, Input, Collapse, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../../components/AppLayout';
import {
  Editor, ProfileImageHeader, ProfileImageAction, EditorHeader, InputWrapper, CollapseWrapper, ButtonWrapper,
} from '../../style/profile';
import { NormalButton } from '../../components/PostDetail/style';
import { LOAD_MY_INFO_REQUEST, UPLOAD_PROFILE_IMAGE_REQUEST, REMOVE_PROFILE_IMAGE_REQUEST, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { backUrl } from '../../config/config';
import useInput from '../../hooks/useInput';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    me, uploadProfileImageDone, removeProfileImageDone, updateProfileDone, updateProfileError,
  } = useSelector((state) => state.user);
  const [profileImageVisible, setProfileImageVisible] = useState(false);
  const [name, onChangeName] = useInput(me.name);
  const [username, onChangeUsername] = useInput(me.username);
  const [exPassword, onChangeExPassword] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const imageInput = useRef();

  useEffect(() => {
    if (!me || !me.id) {
      router.replace('/login');
    }
  }, [me, me?.id]);
  useEffect(() => {
    if (uploadProfileImageDone || removeProfileImageDone) {
      setProfileImageVisible(false);
    }
  }, [uploadProfileImageDone, removeProfileImageDone]);
  useEffect(() => {
    if (updateProfileDone) {
      alert('변경되었습니다.');
    }
  }, [updateProfileDone]);
  useEffect(() => {
    if (updateProfileError) {
      alert(updateProfileError);
    }
  }, [updateProfileError]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);
  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0]);
    dispatch({
      type: UPLOAD_PROFILE_IMAGE_REQUEST,
      data: imageFormData,
    });
  });
  const onProfileUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  const onProfileDelete = useCallback(() => {
    dispatch({
      type: REMOVE_PROFILE_IMAGE_REQUEST,
    });
  });
  const onPopupProfileImage = useCallback(() => {
    setProfileImageVisible(true);
  });
  const onCancel = useCallback(() => {
    setProfileImageVisible(false);
  });

  const onSubmit = useCallback(() => {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
      data: {
        name,
        username,
      },
    });
  });
  const onClickPassword = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    return dispatch({
      type: UPDATE_PASSWORD_REQUEST,
      data: {
        exPassword,
        password,
      },
    });
  });

  return (
    <>
      <Head>
        <title>프로필 변경 • Hongstagram</title>
      </Head>
      <AppLayout>
        <Editor>
          <EditorHeader>
            <button type="button" onClick={onPopupProfileImage}>
              {
                me.src
                  ? <Avatar src={`${backUrl}/${me.src}`} size={42} />
                  : <Avatar icon={<UserOutlined />} size={42} />
              }
            </button>
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
            <div className="info">
              <h2>{me.username}</h2>
              <NormalButton style={{ color: '#0095f6', fontWeight: 600 }} onClick={onPopupProfileImage}>프로필 사진 바꾸기</NormalButton>
            </div>
          </EditorHeader>
          <Form onFinish={onSubmit}>
            <InputWrapper>
              <label htmlFor="user-email">
                이메일
              </label>
              <Input name="user-email" type="email" value={me.email} disabled />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="user-name">
                이름
              </label>
              <Input name="user-name" value={name} onChange={onChangeName} placeholder="이름" />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="user-username">
                사용자 이름
              </label>
              <Input name="user-username" value={username} onChange={onChangeUsername} placeholder="사용자 이름" />
            </InputWrapper>
            <CollapseWrapper>
              <Collapse>
                <Collapse.Panel header="비밀번호 변경">
                  <InputWrapper>
                    <label htmlFor="user-exPassword">
                      이전 비밀번호
                    </label>
                    <Input name="user-exPassword" type="password" value={exPassword} onChange={onChangeExPassword} />
                  </InputWrapper>
                  <InputWrapper>
                    <label htmlFor="user-password">
                      새 비밀번호
                    </label>
                    <Input name="user-password" type="password" value={password} onChange={onChangePassword} />
                  </InputWrapper>
                  <InputWrapper>
                    <label htmlFor="user-passwordCheck">
                      새 비밀번호 확인
                    </label>
                    <Input name="user-passwordCheck" type="password" value={passwordCheck} onChange={onChangePasswordCheck} />
                    {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                  </InputWrapper>
                  <ButtonWrapper>
                    <Button type="primary" onClick={onClickPassword}>비밀번호 변경</Button>
                  </ButtonWrapper>
                </Collapse.Panel>
              </Collapse>
            </CollapseWrapper>
            <ButtonWrapper>
              <Button type="primary" htmlType="submit">제출</Button>
            </ButtonWrapper>
          </Form>
        </Editor>
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

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default ProfileEdit;
