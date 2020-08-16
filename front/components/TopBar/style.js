import styled from 'styled-components';
import { AutoComplete } from 'antd';
import { Center } from '../AppLayout/style';

export const Block = styled.div`
  width: 100%;
  height: 55px;
`;
export const LayoutWrapper = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`;
export const Layout = styled.div`
  width: 100%;
  max-width: 935px;
  margin: 9px auto;
`;
export const Logo = styled.img`
  width: 103px;
`;
export const AutoSearch = styled(AutoComplete)`
  width: 200px;
`;
export const Menu = styled.ul`
  display: flex;
  align-items: center;

  li {
    float: left;
    margin-left: 22px;

    a, button{
      color: #000;
      font-size: 21px;
      padding: 0;
    }
    .ant-btn-text:hover, .ant-btn-text:focus {
      background: transparent;
    }
  }
`;

export const CenterXs = styled(Center)`
  @media (max-width: 576px) {
    display: none;
  }
`;
