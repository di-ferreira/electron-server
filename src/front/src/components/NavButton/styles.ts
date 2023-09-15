import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Light, Red } from '../../colors';

interface isActiveLink {
  active: boolean;
}

export const Container = styled.li<isActiveLink>`
  width: 100%;
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.active ? `${Light.main}` : 'transparent')};
  box-shadow: ${(props) =>
    props.active
      ? '0px 2px 4px 1px rgba(0, 0, 0, 0.5);'
      : '0px 0px 0px 0px rgba(0, 0, 0, 0.75)'};
  transition: all 0.3s ease;
  &:hover {
    padding-left: 0rem;
    border-left-width: 0.6rem;
    background: ${Light.main};
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }
`;

export const NavButtonLink = styled(Link)<isActiveLink>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? Red.main : Light.main)};
  font-weight: ${(props) => (props.active ? '700' : '400')};
  text-decoration: none;
  text-transform: capitalize;
  font-variant: small-caps;
  font-size: 3rem;

  span {
    transition: all 0.3s ease;
    font-size: 1rem;
    opacity: 1;
  }
  &:hover {
    color: ${Red.main};
    span {
      transition: all 0.3s ease;
      opacity: 0;
      // display: none;
    }
  }
`;

export const IconButton = styled(FontAwesomeIcon)`
  margin: 0.5rem 1rem;
`;
