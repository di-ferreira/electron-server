import {
  faArrowLeft,
  faArrowRight,
  faFileInvoiceDollar,
  faFileLines,
  faHouseChimney,
  faPowerOff,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../../assets/astro-burguer.png';
import { NavButton } from '../NavButton';
import {
  Container,
  ContainerNav,
  NavigationContainer,
  OpenCloseButton,
  Top,
} from './styles';

interface iNavBar {
  Open: boolean;
}

export const NavBar: React.FC<iNavBar> = ({ Open }) => {
  const [OpenCloseNavBar, SetOpenCloseNavBar] = useState<boolean>(Open);

  const Logout = () => {
    <Navigate to='/login' replace />;
  };
  const IconOpenCloseButton = OpenCloseNavBar ? (
    <FontAwesomeIcon icon={faArrowLeft} />
  ) : (
    <FontAwesomeIcon icon={faArrowRight} />
  );
  return (
    <Container isOpen={OpenCloseNavBar}>
      <OpenCloseButton onClick={() => SetOpenCloseNavBar(!OpenCloseNavBar)}>
        {IconOpenCloseButton}
      </OpenCloseButton>
      <ContainerNav>
        <Top>
          <img src={Logo} alt='Logo Astro Burguer' /> Astro Burguer
        </Top>
        <NavigationContainer>
          <NavButton
            onClick={() => {}}
            Icon={faHouseChimney}
            Text='dashboard'
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
            Text='orçamentos'
            Link='orcamentos'
          />
          <NavButton
            onClick={() => {}}
            Icon={faFileInvoiceDollar}
            Text='pré-vendas'
            Link='pre-vendas'
          />
          <NavButton
            onClick={() => {}}
            Icon={faFileInvoiceDollar}
            Text='vendas'
            Link='vendas'
          />
          <NavButton
            Icon={faPowerOff}
            Text='sair'
            Link='logout'
            isButton={true}
            onClick={Logout}
          />
        </NavigationContainer>
      </ContainerNav>
    </Container>
  );
};
