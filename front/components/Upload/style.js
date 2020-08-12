import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  .slick-slider {
    margin-bottom: 30px;
    min-height: 250px;
    border: 1px solid #d9d9d9;
  }
`;
export const Title = styled.div`
  margin-bottom: 20px;

  span.title {
    color: #333333;
    font-size: 20px;
    font-weight: 500;
  }
`;
export const Content = styled.div`
  min-height: 300px;

  > * {
    margin-bottom: 15px;
  }

  .ant-switch {
    float: right;
  }
`;
export const ImgWrapper = styled.div`
  .remove {
    position: relative;

    button {
      position: absolute;
      top: 10px;
      right: 5px;
    }
  }
`;
