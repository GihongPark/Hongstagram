import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import Slick from 'react-slick';

import { Image } from './style';
import SlickGlobal from '../../style/slick';

const ImageComponent = ({ images, mode }) => (
  <Image className={mode}>
    <SlickGlobal />
    <Slick
      infinite={false}
      initialSlide={0}
      slidesToShow={1}
      slidesToScroll={1}
      adaptiveHeight
    >
      {mode === 'list' && images.map((image) => (
        <div key={image.src}>
          <img
            src={`${image.src.replace(/\/thumb\//, '/main/')}`}
            style={{ width: '100%' }}
            alt={image.src}
          />
        </div>
      ))}
      {mode === 'post' && images.map((image) => (
        <div key={image.src}>
          <img
            src={`${image.src.replace(/\/thumb\//, '/original/')}`}
            style={{ width: '100%' }}
            alt={image.src}
          />
        </div>
      ))}
    </Slick>
  </Image>
);

ImageComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    src: PropTypes.string,
    createAt: PropTypes.string,
    updateAt: PropTypes.string,
    PostId: PropTypes.number,
  })).isRequired,
  mode: PropTypes.string.isRequired,
};

export default ImageComponent;
