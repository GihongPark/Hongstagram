import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  max-width: 935px;
  width: 100%;
  height: 28px;
  margin: 38px auto;
`;
const Footer = () => (
  <FooterWrapper>
    <a
      style={{ float: 'right' }}
      href="https://github.com/GihongPark"
      target="_blank"
      rel="noreferrer noopener"
    >
      Made by Gipark
    </a>
  </FooterWrapper>
);

export default Footer;
