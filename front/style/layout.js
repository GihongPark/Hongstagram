import styled from 'styled-components';

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
  flex-flow: colum;
  justify-content: center;
  width: 100%;
  max-width: 935px;
  padding-top: 30px;
`;
export const BackgroundColor = styled(FullScreen)`
  background-color: #fafafa;
`;
