import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { LOAD_POST_REQUEST } from '../../reducers/post';
import { Global } from './style';
import Header from './Header';
import Image from './Image';
import Contents from './Contents';

// mode {
//   list
//   post
//   modal
// }
const PostDetail = ({ postId, mode }) => {
  const dispatch = useDispatch();
  const { singlePost, loadPostDone } = useSelector((state) => state.post);

  mode = 'post';

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: postId,
    });
  }, [postId]);

  if (!singlePost) {
    return null;
  }
  return (
    <>
      <Global />
      <article className="wrapper">
        <Header user={singlePost.User} done={loadPostDone} mode={mode} />
        <Image images={singlePost.Images} done={loadPostDone} mode={mode} />
        <Contents
          like={singlePost.Likers.length}
          comments={singlePost.Comments}
          done={loadPostDone}
          mode={mode}
        />
      </article>
    </>
  );
};

PostDetail.propTypes = {
  postId: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
};

export default PostDetail;
