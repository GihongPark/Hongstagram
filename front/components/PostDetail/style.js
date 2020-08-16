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
`;
export const PostWrapper = styled.article`
  position: relative;

  &.list {
    border: 1px solid #dbdbdb;
    margin-bottom: 60px;
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

  &.post {
    @media (min-width: 768px) {
      position: absolute;
      right: 0;
      top: 0;
      width: 335px;
    }
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
export const Image = styled.div`
  &.post {
    @media (min-width: 768px) {
      margin-right: 335px;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-flow: column;

  &.post{
    @media (min-width: 768px) {
      position: absolute;
      right: 0;
      top: 72px;
      bottom: 0;
      width: 335px;
    }
  }
`;
export const Action = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 68px;
  margin-bottom: 16px;

  &.list {
    order: 1;
  }
  &.post {
    order: 2;
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
export const CommentList = styled.div`
  width: 100%;
  overflow: hidden;

  &.list ul.root {
    margin: 0 8px;
  }
  &.post ul.root {
    box-sizing: content-box;
    height: calc(100% - 32px);
    overflow-x: hidden;
    overflow-y: scroll;
    left: 0;
    padding: 16px 12px;
    width: calc(100% - 8px);
    
    li {
      margin-left: -12px;
      padding: 12px 16px;
    }
  }
  
  li {
    display: flex;
    word-break: break-word;
    overflow: hidden;
    
    &:first-of-type {
      margin-top: -5px;
    }

    .del{
      display: none;
      margin-left: auto;
      color: #0009;
      font-size: 16px;
      cursor: pointer;
    }
    &:hover .del {
      display: block;
    }

    .content {
      margin-left: 12px;

    }
    h3 {
      display: inline;
      font-size: 14px;
      font-weight: 600;
      margin-right: 4px;
    }
  }

  &.list {
    order: 2;
  }
  &.post {
    order: 1;
    flex-grow: 1;
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
export const CommentInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 55px;
  border-top: 1px solid #efefef;
  color: #8e8e8e;
  order: 3;

  @media (max-width: 768px) {
    display: none;
  }

  textarea {
    resize: none;
    padding: 17px 11px;
  }
`;
export const CommentButton = styled(NormalButton)`
  position: absolute;
  right: 11px;
  color: rgb(0, 149, 246);
`;
