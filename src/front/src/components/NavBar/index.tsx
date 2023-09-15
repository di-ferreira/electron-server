import {
  faFileInvoiceDollar,
  faFileLines,
  faHouseChimney,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import LogoImage from '../../assets/astro-burguer.png';
import { NavButton } from '../NavButton';
import { Container, ContainerNav, Logo, NavigationContainer } from './styles';

export const NavBar: React.FC = () => {
  return (
    <Container>
      <ContainerNav>
        <Logo>
          <img src={LogoImage} alt='Logo Astro Burguer' />
        </Logo>
        <NavigationContainer>
          <NavButton
            active
            onClick={() => {}}
            Icon={faHouseChimney}
            Link='home'
          />
          <NavButton
            onClick={() => {}}
            Icon={faUsers}
            Text='clientes'
            Link='clientes'
          />
          <NavButton
            onClick={() => {}}
            Icon={faFileLines}
            Text='pedidos'
            Link='pedidos'
          />
          <NavButton
            onClick={() => {}}
            Icon={faFileInvoiceDollar}
            Text='cardápio'
            Link='cardápio'
          />
          <NavButton
            onClick={() => {}}
            Icon={faFileInvoiceDollar}
            Text='caixa'
            Link='caixa'
          />
          <NavButton
            onClick={() => {}}
            Icon={faFileInvoiceDollar}
            Text='bot'
            Link='bot'
          />
          <NavButton
            onClick={() => {}}
            Icon={faFileInvoiceDollar}
            Text='configurações'
            Link='configurações'
          />
        </NavigationContainer>
      </ContainerNav>
    </Container>
  );
};
