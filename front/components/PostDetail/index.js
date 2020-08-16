import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Global, PostWrapper } from './style';
import Header from './Header';
import Image from './Image';
import Contents from './Contents';

// mode {
//   list
//   post
//   modal
// }
const PostDetail = ({ post, loading, mode }) => {
  if (!loading) {
    return null;
  }
  return (
    <>
      <PostWrapper className={`wrapper ${mode}`}>
        <Header user={post?.User} done={loading} mode={mode} />
        <Image images={post?.Images} done={loading} mode={mode} />
        <Contents
          post={post}
          done={loading}
          mode={mode}
        />
      </PostWrapper>
    </>
  );
};

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
};

export default PostDetail;
