import React, { useState, useCallback, useEffect } from 'react';
import { Row, Avatar } from 'antd';
import {
  HomeOutlined,
  HomeTwoTone,
  UploadOutlined,
  MessageOutlined,
  MessageTwoTone,
  CompassOutlined,
  CompassTwoTone,
  HeartOutlined,
  HeartTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Block, LayoutWrapper, Layout, Logo, AutoSearch, Menu, Left, Center, Right } from '../style/topbar';

const TopBar = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log(router.pathname);
    console.log(router.pathname === '/');
  }, []);

  const filterOption = useCallback((inputValue, option) => option.value
    .toUpperCase().indexOf(inputValue.toUpperCase()) !== -1);

  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [
        { value: searchText },
      ],
    );
    // TODO: 자동완성 api 넣기
  };

  const onSelect = (data) => {
    console.log('onSelect: ', data);
    // TODO: 해당 유저 || 태그 이동
  };

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
            <Center xs={0} sm={8}>
              <AutoSearch
                options={options}
                placeholder="검색"
                filterOption={filterOption}
                onSelect={onSelect}
                onSearch={onSearch}
              />
            </Center>
            <Right xs={12} sm={8}>
              <Menu>
                <li><Link href="/"><a>{
                  router.pathname === '/'
                    ? <HomeTwoTone twoToneColor="#000" />
                    : <HomeOutlined />
                }</a></Link></li>
                <li><Link href="/upload"><a><UploadOutlined /></a></Link></li>
                <li><Link href="/direct"><a>{
                  router.pathname === '/direct'
                    ?<MessageTwoTone twoToneColor="#000" />
                    : <MessageOutlined />
                }</a></Link></li>
                <li><Link href="/explore"><a>{
                  router.pathname === '/explore'
                    ? <CompassTwoTone twoToneColor="#000" />
                    : <CompassOutlined />
                }</a></Link></li>
                <li><Link href="/active"><a>{
                  router.pathname === '/active'
                    ? <HeartTwoTone twoToneColor="#000" />
                    : <HeartOutlined />
                }</a></Link></li>
                <li><Link href="/profile"><a>
                  <Avatar src={me.src} icon={<UserOutlined />} size="small" />
                </a></Link></li>
              </Menu>
            </Right>
          </Row>
        </Layout>
      </LayoutWrapper>
    </nav>
  );
};

export default TopBar;
