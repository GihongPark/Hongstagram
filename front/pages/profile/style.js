import styled, { createGlobalStyle } from 'styled-components';
import { Row } from 'antd';

export const Global = createGlobalStyle`
.ant-tabs-tab.ant-tabs-tab-active {
  .ant-tabs-tab-btn {
    color: #000;
    font-weight: 600;
  }
}
.ant-tabs-ink-bar {
  background: #000;
}
`;
export const UserInfo = styled.header`
  width: 100%;
  > div.wrapper {
    margin-bottom: 44px;
  }
`;
export const ProfileImageButton = styled.button`
  display: block;
  margin: 0 auto;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;
export const ProfileImageHeader = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  padding: 32px 32px 16px;
  text-align: center;
`;
export const ProfileImageAction = styled.div`
  button {
    display: block;
    width: 100%;
    min-height: 48px;
    border-top: 1px solid #dbdbdb;
    line-height: 1.5;
    padding: 4px 8px;
    text-align: center;
    user-select: none;
    vertical-align: middle;
  }
`;
export const ProfileImageDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileInfo = styled.div`
  > * {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: #262626;
  }
  
  h1 {
    
  }

  h2 {
    font-size: 28px;
    font-weight: 300;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  .ant-btn {
    color: #262626;
    margin-left: 20px;
    background-color: transparent;

    &-primary {
      color: #fff;
      background: #1890ff;
    }
  }

  ul {
    display: flex;
    align-items: center;
    
    li {
      float: left;
      padding-right: 22px;
    
      &, & > button > span {
        color: #262626;
        font-size: 16px;
        
        span {
          font-weight: 500;
        }
      }
    }
  }
`;

export const SettingButton = styled.div`
  .ant-btn {
    color: #262626;
    margin-left: 20px;
    background-color: transparent;

    &-primary {
      color: #fff;
      background: #1890ff;
    }
  }

  .xs {
    margin: 0;
    width: 90%;
  }

  .lg {
    @media (max-width: 992px) {
      display: none;
    }
  }
`;

export const ListWrapper = styled(Row)`
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 0;

  @media (min-width: 992px) {
    display: none;
  }

  > .ant-col {
    display: flex;
    flex-flow: column;
    align-items: center;

    &, & > button > div {
      color: #262626;
      font-size: 14px;
    }

    .ant-btn {
      color: #262626;
      margin-left: 20px;
      background-color: transparent;
    }
  }
`;

export const Editor = styled.div`
  width: 100%;
  padding: 40px 0;
  background: #fff;
  border: 1px solid #dbdbdb;
`;
export const EditorHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;

  > button {
    width: 150px;
    padding-right: 32px;
    box-sizing: content-box;
    text-align: right;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
  .info {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    width: 350px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      line-height: 20px;
    }
    button {
      line-height: 14px;
    }
  }
`;
export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 22px;
  flex-wrap: wrap;

  label {
    font-size: 16px;
    font-weight: 600;
    line-height: 38px;
    width: 150px;
    padding-right: 32px;
    box-sizing: content-box;
    text-align: right;
  }
  input {
    font-size: 16px;
    max-width: 350px;
  }
`;
export const CollapseWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 22px 0;
`;
