import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import Slick from 'react-slick';

import { Image } from './style';
import SlickGlobal from '../../style/slick';
import { backUrl } from '../../config/config';

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
      {
        images.map((image) => (
          <div key={image.src}>
            <img
              src={`${backUrl}/${image.src}`}
              style={{ width: '100%' }}
              alt={image.src}
            />
          </div>
        ))
      }
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
