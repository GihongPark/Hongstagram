import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { Header, UserName, NormalButton } from './style';

const HeaderComponent = ({ user, mode }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <Header className={mode}>
      <Link href={`/profile/${user.username}`}><a><Avatar src={user.src} icon={<UserOutlined />} size={32} /></a></Link>
      <UserName>
        <span>{user.username}</span>
        {
          user.id
            && user.id === me.id
            ? null
            : (
              <span> • <NormalButton type="text">팔로잉</NormalButton></span>
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
  }).isRequired,
  mode: PropTypes.string.isRequired,
};

export default HeaderComponent;
