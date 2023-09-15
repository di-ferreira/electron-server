import styled from 'styled-components';
import { Light, Primary } from '../../colors';

export const Logo = styled.h1`
  width: 100%;
  height: 11rem;
  margin: 1.5rem 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 500;
  font-size: 2rem;
  & img {
    width: 85%;
  }
`;

export const NavigationContainer = styled.ul`
  width: 100%;
`;

export const Container = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 10rem;
  height: 100vh;
  color: ${Light.main};
  background-color: ${Primary.main};
  transition: all 0.3s ease;
  & h1,
  div {
    display: flex;
  }
  & ul {
    display: block;
  }

  @media only screen and 1024px {
    width: 45rem;
  }
`;

export const ContainerSwitchTheme = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  width: 100%;
  height: auto;
`;

export const ContainerNav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
