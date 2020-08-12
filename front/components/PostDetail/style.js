import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  .ant-modal {
    max-width: 935px;
    padding: 0 40px;
  }
  .ant-skeleton {
    display: flex;
    align-items: center;

    .ant-skeleton-paragraph {
      margin-top: 14px;
    }
  }
  .ant-empty {
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      height: 500px;
    }
  }
  
  article.wrapper {
    position: relative;
  }
`;

export const NormalButton = styled.button`
  border: transparent;
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 16px;

  @media (min-width: 768px) {
    position: absolute;
    right: 0;
    top: 0;
    width: 335px;
  }
`;
export const UserName = styled.div`
  margin-left: 12px;
  font-weight: 600;

  button {
    font-weight: 600;
    padding: 0;

    &:hover, &:focus {
      background: transparent;
    }
  }
`;
export const PostImage = styled.div`
  @media (min-width: 768px) {
    margin-right: 335px;
  }
`;
export const PostWrapper = styled.div`
  @media (min-width: 768px) {
    position: absolute;
    right: 0;
    top: 72px;
    bottom: 0;
    width: 335px;
  }
`;
export const PostAction = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 68px;

  @media (min-width: 768px) {
    position: absolute;
    bottom: 55px;
  }
`;
export const List = styled.ul`
  width: 100%;
  clear: both;

  li {
    float: left;
    margin: 0 8px;
    font-size: 24px;
    & button {
      font-size: 24px;
    }

    &:last-of-type {
      float: right;
    }
  }
`;
export const Like = styled.div`
  padding: 0 8px;
  button {
    font-weight: 600;
  }
`;
export const Comment = styled.div`
  width: 100%;
  overflow: hidden;

  ul.root {
    box-sizing: content-box;
    height: calc(100% - 32px);
    overflow-x: hidden;
    overflow-y: scroll;
    left: 0;
    padding: 16px 12px;
    position: absolute;
    width: calc(100% - 8px);
  }

  @media (max-width: 768px) {
    display: none;
  }
  @media (min-width: 768px) {
    position: absolute;
    top: 0;
    bottom: 123px;

  }
`;
export const CommentInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  border-top: 1px solid #efefef;
  color: #8e8e8e;

  @media (min-width: 768px) {
    position: absolute;
    bottom: 0;
  }

  textarea {
    resize: none;
  }
`;
export const CommentButton = styled(NormalButton)`
  position: absolute;
  right: 11px;
  color: rgb(0, 149, 246);
`;
