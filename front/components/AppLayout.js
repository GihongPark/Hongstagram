import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import TopBar from './TopBar';
import Footer from './Footer';
import { Main, Layout, BackgroundColor } from '../style/layout';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <BackgroundColor>
        {me ? <TopBar /> : null}
        <Main>
          <Layout>
            {children}
          </Layout>
        </Main>
        <Footer />
      </BackgroundColor>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
