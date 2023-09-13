import React from 'react';

// import { Container } from './styles';
import { FlexComponent } from '../../components/FlexComponent';
import { NavBar } from '../../components/NavBar';

export const Home: React.FC = () => {
  return (
    <FlexComponent>
      <NavBar Open={true} />
      <h1>Home</h1>
    </FlexComponent>
  );
};

