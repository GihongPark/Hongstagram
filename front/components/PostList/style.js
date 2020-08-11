import styled from 'styled-components';

export const PostCardWrapper = styled.div`
  margin-bottom: 28px;

  > button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;

export const Card = styled.div`
  position: relative;

  > div {
    display: none;
  }
  &:hover > div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0000004d;
    color: #fff;
    font-size: 18px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        float: left;
        margin: 0 15px;

        .anticon {
          margin-right: 8px
        }
      }
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  margin: 40px;
  justify-content: center;

  .anticon-loading {
    font-size: 42px;
  }
`;
