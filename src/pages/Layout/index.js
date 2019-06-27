import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import logo from '../../images/logo.png';

const Layout = ({ children }) => {
  return (
    <div>
      <Menu inverted stackable pointing size='large'>
        <Container >
          <Menu.Item>
            <Image size='tiny' src={logo} style={{ marginRight: '1.5em' }} />
            Juegos en blockchain - MemoChain
          </Menu.Item>
          <Menu.Item name='contract' header position='right'>
            <a style={{ color: 'white' }} href={ENVAR_BLOCKCHAIN_NETWORK + 'address/' + ENVAR_CONTRACT_ADDRESS} target="_blank">{'Ver contrato: ' + ENVAR_CONTRACT_ADDRESS}</a>
          </Menu.Item>
        </Container>
      </Menu>
      {children}
    </div>
  );
};

export default Layout;
