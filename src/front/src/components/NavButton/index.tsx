import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Container, IconButton, NavButtonLink } from './styles';

interface iNavButton {
  Text?: string;
  Link: string;
  Icon: IconProp;
  active?: boolean;
  isButton?: boolean;
  onClick?: () => void;
}

export const NavButton: React.FC<iNavButton> = ({
  Text,
  Icon,
  Link,
  onClick,
  active,
}) => {
  const Click = () => {
    onClick && onClick();
  };

  return (
    <Container active={active ? active : false} onClick={() => Click()}>
      <NavButtonLink active={active ? active : false} to={Link}>
        <IconButton icon={Icon} />
        <span>{Text}</span>
      </NavButtonLink>
    </Container>
  );
};

