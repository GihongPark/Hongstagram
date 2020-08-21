import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { Global, Title, List, Image, Name } from './style';
import { LOAD_USER_LIST_REQUEST } from '../../reducers/user';

const LIST_TYPE = {
  like: '좋아요',
  follow: '팔로잉',
  follower: '팔로워',
};
const UserList = ({ type, paramData, visible, onCancel }) => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);

  useEffect(() => {
    if (type) {
      dispatch({
        type: LOAD_USER_LIST_REQUEST,
        data: {
          type,
          paramData,
        },
      });
    }
  }, [type]);

  return (
    <>
      <Global />
      <Modal
        className="userList"
        visible={visible}
        onCancel={onCancel}
        width="100%"
        footer={false}
      >
        <Title><h2>{LIST_TYPE[type]}</h2></Title>
        <List>
          <ul>
            {userList.map((user) => (
              <Link key={user.id} href={`/profile/${user.username}`}>
                <a>
                  <li>
                    <Image>
                      {
                        user.src
                          ? <Avatar src={`${user.src}`} size={32} />
                          : <Avatar icon={<UserOutlined />} size={32} />
                      }
                    </Image>
                    <Name>
                      <strong>{user.username}</strong>
                      <div>{user.name}</div>
                    </Name>
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </List>
      </Modal>
    </>
  );
};

UserList.propTypes = {
  type: PropTypes.string.isRequired,
  paramData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UserList;
