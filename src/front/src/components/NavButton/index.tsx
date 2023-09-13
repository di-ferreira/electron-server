import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { Container, IconButton, NavButtonLink } from './styles';

interface iNavButton {
  Text: string;
  Link: string;
  Icon: IconProp;
  isButton?: boolean;
  onClick?: () => void;
}

export const NavButton: React.FC<iNavButton> = ({
  Text,
  Icon,
  Link,
  onClick,
}) => {
  const Click = () => {
    onClick && onClick();
  };

  return (
    <Container active={true} onClick={() => Click()}>
      <NavButtonLink active={true} to={Link}>
        <IconButton icon={Icon} />
        <span>{Text}</span>
      </NavButtonLink>
    </Container>
  );
};

