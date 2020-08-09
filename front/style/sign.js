import styled from 'styled-components';
import { Form } from 'antd';

export const Layout = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  width: 100%;
  max-width: 350px;
  margin-bottom: 50px;
`;
export const Box = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: #fff;
  margin: 0 0 10px;
  padding: 10px 0;
`;
export const Logo = styled.h1`
  width: 175px;
  height: 61px;
  color: transparent;
  font-size: 35px;
  text-align: center;
  margin: 22px auto 12px;
  background-image: url("/image/logo.png");
`;
export const FormWrapper = styled(Form)`
  display: flex;
  flex-flow: column;
  max-width: 350px;
`;
export const InputWrapper = styled.div`
  height: 32px;
  margin: 0 40px 6px;
  position: relative;
`;
export const ButtonWrapper = styled.div`
  margin: 8px 40px 8px;

  button {
    width: 100%;
  }
`;
export const Terms = styled.p`
  color: #8e8e8e;
  font-size: 12px;
  line-height: 16px;
  margin: 10px 40px 30px;
  text-align: center;
`;
export const OtherPath = styled.p`
  color: #262626;
  font-size: 14px;
  margin: 15px;
  text-align: center;
`;
