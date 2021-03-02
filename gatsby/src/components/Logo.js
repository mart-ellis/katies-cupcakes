import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.svg'

const LogoStyles = styled.div`
  /* This value controls the entire size of the logo*/
  font-size: 6px;
  font-size: clamp(1px, 0.65vw, 8px);
  width: 30em;
  height: 30em;
  margin: 0;
  display: flex;
  .inner {
    margin: var(--borderSize);
    flex: 1;
    display: grid;
    grid-template-rows: 20% 1fr 1fr;
    align-content: center;
  }
`;

export default function Logo() {
  return (
    <LogoStyles className="logo">
      <div className="inner">
        <img src={logo} alt="logo" />
      </div>
    </LogoStyles>
  );
}
