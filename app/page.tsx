import React from 'react';
import AccountGenerator from './components/testnet/AccountGenerator';
import Footer from './components/Footer';

const Home: React.FC = () => {
  return (
    
    <div className="container body-overlay">
      <AccountGenerator />
      <Footer />
    </div>
  );
}

export default Home;
