import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  .slick-slider {
    margin-bottom: 30px;
    min-height: 250px;
    border: 1px solid #d9d9d9;
  }
  .slick-prev, .slick-next {
    width: 25px;
    height: 25px;
  }
  .slick-next {
    right: 5px;
    z-index: 99;
  }
  .slick-prev {
    left: 5px;
    z-index: 99;
  }
  .slick-prev:before, .slick-next:before {
    font-size: 25px;
  }
  .slick-dots li button:before {
    z-index:99;
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
