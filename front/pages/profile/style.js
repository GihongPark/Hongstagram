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
    list-style: none;
    padding: 0;
    
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
