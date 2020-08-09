import styled from 'styled-components';
import { Button } from 'antd';

export const UserInfo = styled.header`
  width: 100%;
  margin-bottom: 44px;
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
