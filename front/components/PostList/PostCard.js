import React from 'react';
import PropTypes from 'prop-types';
import { HeartFilled, MessageFilled } from '@ant-design/icons';

import { backUrl } from '../../config/config';
import { PostCardWrapper, Card } from './style';

const PostCard = ({ post, showPost }) => (
  <PostCardWrapper>
    <button type="button" onClick={showPost(post.id)}>
      <Card>
        <img
          src={`${backUrl}/${post.Images[0].src}`}
          style={{ width: '100%' }}
          alt={post.Images[0].src}
        />
        <div>
          <ul>
            <li>
              <HeartFilled />
              <span>{post.Likers.length}</span>
            </li>
            <li>
              <MessageFilled />
              <span>{post.Comments.length}</span>
            </li>
          </ul>
        </div>
      </Card>
    </button>
  </PostCardWrapper>
);

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  showPost: PropTypes.func.isRequired,
};

export default PostCard;
