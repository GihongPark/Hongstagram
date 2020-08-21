import React, { useState, useCallback, useEffect } from 'react';
import { Row, Avatar, Button, Tooltip } from 'antd';
import {
  HomeOutlined,
  HomeTwoTone,
  UploadOutlined,
  CompassOutlined,
  CompassTwoTone,
  HeartOutlined,
  HeartTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Block, LayoutWrapper, Layout, Logo, AutoSearch, Menu, CenterXs } from './style';
import { Left, Right } from '../AppLayout/style';
import Upload from '../Upload';
import { AUTO_COMPLETE_REQUEST } from '../../reducers/search';

const TopBar = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { autoComplete, autoCompleteLoading } = useSelector((state) => state.search);
  const router = useRouter();

  const [options, setOptions] = useState([]);
  const [uploadVisible, setUploadVisible] = useState(false);

  useEffect(() => {
    setOptions(autoComplete);
  }, [autoComplete]);

  // const filterOption = useCallback((inputValue, option) => option.value
  //   .toUpperCase().indexOf(inputValue.toUpperCase()) !== -1);

  const onSearch = (searchText) => {
    dispatch({
      type: AUTO_COMPLETE_REQUEST,
      data: searchText,
    });
  };

  const onSelect = (data) => {
    console.log('onSelect: ', data);
    // TODO: 해당 유저 || 태그 이동
    if (data[0] === '#') {
      router.push(`/hashtag/${data.slice(1)}`);
    } else {
      router.push(`/profile/${data}`);
    }
  };

  const showUpload = () => setUploadVisible(true);

  return (
    <nav>
      <Block />
      <LayoutWrapper>
        <Layout>
          <Row>
            <Left xs={12} sm={8}>
              <Link href="/">
                <a><Logo src="/image/logo.png" alt="logo" /></a>
              </Link>
            </Left>
            <CenterXs xs={0} sm={8}>
              <AutoSearch
                options={options}
                placeholder="검색"
                // filterOption={filterOption}
                onSelect={onSelect}
                onSearch={onSearch}
                loading={autoCompleteLoading}
              />
            </CenterXs>
            <Right xs={12} sm={8}>
              <Menu>
                <Tooltip placement="bottom" title="Home">
                  <li>
                    <Link href="/">
                      <a>
                        {
                          router.pathname === '/'
                            ? <HomeTwoTone twoToneColor="#000" />
                            : <HomeOutlined />
                        }
                      </a>
                    </Link>
                  </li>
                </Tooltip>
                <Tooltip placement="bottom" title="Upload">
                  <li>
                    <Button type="text" onClick={showUpload}><UploadOutlined /></Button>
                    <Upload visible={uploadVisible} setVisible={setUploadVisible} />
                  </li>
                </Tooltip>
                <Tooltip placement="bottom" title="Explore">
                  <li>
                    <Link href="/explore">
                      <a>
                        {
                          router.pathname === '/explore'
                            ? <CompassTwoTone twoToneColor="#000" />
                            : <CompassOutlined />
                        }
                      </a>
                    </Link>
                  </li>
                </Tooltip>
                {/* <Tooltip placement="bottom" title="Active">
                  <li>
                    <Link href="/active">
                      <a>
                        {
                          router.pathname === '/active'
                            ? <HeartTwoTone twoToneColor="#000" />
                            : <HeartOutlined />
                        }
                      </a>
                    </Link>
                  </li>
                </Tooltip> */}
                <Tooltip placement="bottom" title="Profile">
                  <li>
                    <Link href={`/profile/${me?.username}`}>
                      <a>
                        {
                          me?.src
                            ? <Avatar src={`${me?.src}`} size="small" />
                            : <Avatar icon={<UserOutlined />} size="small" />
                        }
                      </a>
                    </Link>
                  </li>
                </Tooltip>
              </Menu>
            </Right>
          </Row>
        </Layout>
      </LayoutWrapper>
    </nav>
  );
};

export default TopBar;
