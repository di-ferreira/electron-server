import React from 'react';

// import { Container } from './styles';
import { Outlet } from 'react-router-dom';
import { FlexComponent } from '../../components/FlexComponent';
import { NavBar } from '../../components/NavBar';

export const Home: React.FC = () => {
  return (
    <FlexComponent>
      <NavBar />
      <Outlet />
    </FlexComponent>
  );
};

