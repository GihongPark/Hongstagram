import React, { useCallback, useEffect } from 'react';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { SIGN_UP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { Layout, Box, Logo, FormWrapper, InputWrapper, ButtonWrapper, Terms, OtherPath } from '../style/sign';

const Signup = () => {
  const dispatch = useDispatch();
  const { me, signUpDone, signUpError, signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [name, onChangeName] = useInput('');

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/login');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onSubmit = useCallback((e) => (
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        username,
        name,
      },
    })
  ), [email, password, username, name]);

  return (
    <>
      <Head>
        <title>가입하기 • Hongstagram</title>
      </Head>
      <AppLayout>
        <Layout>
          <Box>
            <Logo>홍스타그램</Logo>
            <FormWrapper onFinish={onSubmit}>
              <InputWrapper>
                <label htmlFor="user-email">
                  <Input name="user-email" type="email" value={email} onChange={onChangeEmail} placeholder="이메일 주소" required />
                </label>
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="user-name">
                  <Input name="user-name" value={name} onChange={onChangeName} placeholder="이름" />
                </label>
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="user-username">
                  <Input name="user-username" value={username} onChange={onChangeUsername} placeholder="사용자 이름" required />
                </label>
              </InputWrapper>
              <InputWrapper>
                <label htmlFor="user-password">
                  <Input name="user-password" type="password" value={password} onChange={onChangePassword} placeholder="비밀번호" required />
                </label>
              </InputWrapper>
              <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={signUpLoading}>가입</Button>
              </ButtonWrapper>
              <Terms>
                가입하면 홍스타그램 정책에 동의하게 됩니다.
              </Terms>
            </FormWrapper>
          </Box>
          <Box>
            <OtherPath>계정이 있으신가요? <Link href="/login"><a>로그인</a></Link></OtherPath>
          </Box>
        </Layout>
      </AppLayout>
    </>
  );
};

export default Signup;
