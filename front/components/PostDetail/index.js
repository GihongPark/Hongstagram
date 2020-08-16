import React from 'react';
import PropTypes from 'prop-types';

import { PostWrapper } from './style';
import Header from './Header';
import Image from './Image';
import Contents from './Contents';

// mode {
//   list
//   post
//   modal
// }
const PostDetail = ({ post, mode }) => {
  if (!post) {
    return null;
  }
  return (
    <>
      <PostWrapper className={`wrapper ${mode}`}>
        <Header user={post?.User} mode={mode} />
        <Image images={post?.Images} mode={mode} />
        <Contents
          post={post}
          mode={mode}
        />
      </PostWrapper>
    </>
  );
};

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
};

export default PostDetail;
