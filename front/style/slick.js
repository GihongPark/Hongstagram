import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
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
