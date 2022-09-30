import React from 'react';
import './css/App.css';

import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

  render() {
    return (
      <>
        <Header />
        <Main/>
        <Footer />
      </>
    );
  }
}

export default App;
