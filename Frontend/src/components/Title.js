import React from 'react';
import logo from '../logo512.png';
function Title() {
  return (
    <h1 style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} width="120px" alt="logo" />
    </h1>
  );
}

export default Title;
