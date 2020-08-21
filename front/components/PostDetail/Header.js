import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { Header, UserName, NormalButton } from './style';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';

const HeaderComponent = ({ user, mode }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const onFollow = useCallback(() => {
    dispatch({
      type: FOLLOW_REQUEST,
      data: user.id,
    });
  });
  const onUnFollow = useCallback(() => {
    dispatch({
      type: UNFOLLOW_REQUEST,
      data: user.id,
    });
  });
  return (
    <Header className={mode}>
      <Link href={`/profile/${user.username}`}>
        <a>
          {
            user.src
              ? <Avatar src={`${user.src}`} size={32} />
              : <Avatar icon={<UserOutlined />} size={32} />
          }
        </a>
      </Link>
      <UserName>
        <Link href={`/profile/${user.username}`}><a style={{ color: '#222' }}><span>{user.username}</span></a></Link>
        {
          user.id
            && user.id === me.id
            ? null
            : (
              <span>{' '}•{' '}
                {
                  user.isFollow
                    ? <NormalButton type="text" onClick={onUnFollow}> 팔로잉</NormalButton>
                    : <NormalButton type="text" onClick={onFollow} style={{ color: '#1890ff' }}> 팔로우</NormalButton>
                }
              </span>
            )
        }
      </UserName>
    </Header>
  );
};

HeaderComponent.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
    isFollow: PropTypes.bool,
  }).isRequired,
  mode: PropTypes.string.isRequired,
};

export default HeaderComponent;
