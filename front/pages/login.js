import React, { useCallback, useEffect } from 'react';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import { LOG_IN_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { Layout, Box, Logo, FormWrapper, InputWrapper, ButtonWrapper, Terms, OtherPath } from '../style/sign';

const Signup = () => {
  const dispatch = useDispatch();
  const { me, logInDone, logInError, logInLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInDone) {
      Router.replace('/');
    }
  }, [logInDone]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmit = useCallback((e) => (
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email,
        password,
      },
    })
  ), [email, password]);

  return (
    <>
      <Head>
        <title>로그인 • Hongstagram</title>
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
                <label htmlFor="user-password">
                  <Input name="user-password" type="password" value={password} onChange={onChangePassword} placeholder="비밀번호" required />
                </label>
              </InputWrapper>
              <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
              </ButtonWrapper>
              <Terms />
            </FormWrapper>
          </Box>
          <Box>
            <OtherPath>계정이 없으신가요? <Link href="/signup"><a>가입하기</a></Link></OtherPath>
          </Box>
        </Layout>
      </AppLayout>
    </>
  );
};

export default Signup;
