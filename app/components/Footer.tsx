'use client'
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      position: 'fixed', /* フッターを画面下部に固定 */
      left: 0,
      bottom: 0,
      width: '100%',
      paddingTop: '10px',
      paddingBottom: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      textAlign: 'center',
      zIndex: 10 /* フッターが他の要素よりも上に表示されるように */
    }}>
      <a href="https://testnet.symbol.fyi/" style={{ color: '#fff', marginRight: '10px', textDecoration: 'none' }} target="_blank">
        Testnet Explorer
      </a>
      |
      <a href="https://testnet.symbol.tools/" style={{ color: '#fff', marginLeft: '10px', textDecoration: 'none' }} target="_blank">
        Testnet Faucet
      </a>
    </footer>
  );
}

export default Footer;
