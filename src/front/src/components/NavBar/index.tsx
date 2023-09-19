import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBellConcierge,
  faCashRegister,
  faCogs,
  faFileLines,
  faHouseChimney,
  faRobot,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import LogoImage from '../../assets/astro-burguer.png';
import { FlexComponent } from '../FlexComponent';
import { NavButton } from '../NavButton';
import { Container, ContainerNav, Logo, NavigationContainer } from './styles';

interface iNavButton {
  isActive: boolean;
  onClick?: () => void;
  Icon: IconProp;
  Link: string;
}

export const NavBar: React.FC = () => {
  const [NavButtons, setNavButtons] = useState<iNavButton[]>([]);

  const ActiveButton = (item: iNavButton) => {
    setNavButtons(
      NavButtons.map((btn) =>
        btn.Link === item.Link
          ? { ...btn, isActive: true }
          : { ...btn, isActive: false }
      )
    );
  };

  const ReturnNav = (item: iNavButton) => {
    if (item.Link !== 'bot' && item.Link !== 'configurações') {
      return (
        <NavButton
          key={item.Link}
          {...item}
          onClick={() => {
            ActiveButton(item);
            item.onClick && item.onClick();
          }}
          active={item.isActive}
        />
      );
    }
  };

  const ReturnConfigs = (item: iNavButton) => {
    if (item.Link === 'bot' || item.Link === 'configurações') {
      return (
        <NavButton
          key={item.Link}
          {...item}
          onClick={() => {
            ActiveButton(item);
            item.onClick && item.onClick();
          }}
          active={item.isActive}
        />
      );
    }
  };

  useEffect(() => {
    setNavButtons([
      {
        isActive: true,
        onClick: () => {
          console.log('home');
        },
        Icon: faHouseChimney,
        Link: 'home',
      },
      {
        isActive: false,
        onClick: () => {
          console.log('clientes');
        },
        Icon: faUsers,
        Link: 'clientes',
      },
      {
        isActive: false,
        onClick: () => {},
        Icon: faBellConcierge,
        Link: 'pedidos',
      },
      {
        isActive: false,
        onClick: () => {},
        Icon: faFileLines,
        Link: 'cardápio',
      },
      {
        isActive: false,
        onClick: () => {},
        Icon: faCashRegister,
        Link: 'caixa',
      },
      {
        isActive: false,
        onClick: () => {},
        Icon: faRobot,
        Link: 'bot',
      },
      {
        isActive: false,
        onClick: () => {},
        Icon: faCogs,
        Link: 'configurações',
      },
    ]);
  }, []);

  return (
    <Container>
      <ContainerNav>
        <Logo>
          <img src={LogoImage} alt='Logo Astro Burguer' />
        </Logo>
        <NavigationContainer>
          <FlexComponent direction='column' height='60%'>
            {NavButtons.map(ReturnNav)}
          </FlexComponent>
          <FlexComponent
            direction='column'
            height='30%'
            justifyContent='space-between'
          >
            {NavButtons.map(ReturnConfigs)}
          </FlexComponent>
        </NavigationContainer>
      </ContainerNav>
    </Container>
  );
};
