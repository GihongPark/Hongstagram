import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  .userList.ant-modal {
    padding: 0;
    display: flex;
    justify-content: center;

    .ant-modal-content {
      max-width: 300px;
      min-width: 200px;
      width: 100%;
      height: 350px;
      border-radius: 12px;
      overflow: hidden;
      margin: 20px;
    }

    .ant-modal-body {
      height: 100%;
      padding: 0;
    }
  }
`;
export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  height: 57px;

  h2 {
    font-size: 21px;
    font-weight: 600;
    line-height: 24px;
  }
`;

export const List = styled.div`
  height: calc(100% - 57px);
  overflow-y: scroll;

  li {
    display: flex;
    padding: 8px 16px;

    &:hover {
      background: #1890ff33
    }
  }
`;
export const Image = styled.div`
  margin-right: 12px;
`;
export const Name = styled.div`
  color: #222;
  line-height: 16px;
`;
