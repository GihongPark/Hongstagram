import styled from 'styled-components';
import { Col } from 'antd';

export const FullScreen = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  overflow: hidden;
`;
export const Main = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;
export const Layout = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 935px;
  padding-top: 30px;
`;
export const BackgroundColor = styled(FullScreen)`
  background-color: #fafafa;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

export const Left = styled(Col)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const Center = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Right = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
