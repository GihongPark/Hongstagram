import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { UserOutlined, DeleteFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { NormalButton } from './style';
import { REMOVE_COMMENT_REQUEST } from '../../reducers/post';
import { backUrl } from '../../config/config';
import PostContent from './PostContent';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const onRemove = useCallback(() => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: comment.id,
    });
  });
  return (
    <li>
      <Link href={`/profile/${comment.User.username}`}>
        <a>
          {
            comment.User.src
              ? <Avatar src={`${backUrl}/${comment.User.src}`} size={32} />
              : <Avatar icon={<UserOutlined />} size={32} />
          }
        </a>
      </Link>
      <div className="content">
        <Link href={`/profile/${comment.User.username}`}><a style={{ color: '#222' }}><h3>{comment.User.username}</h3></a></Link>
        <PostContent postData={comment.content} />
      </div>
      {me.id === comment.User.id && (
        <NormalButton className="del" onClick={onRemove}>
          <DeleteFilled />
        </NormalButton>
      )}
    </li>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
