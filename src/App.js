import React from 'react';
import axios from 'axios';
import './css/App.css';

import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';

import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
      errorMessage: '',
    };
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value });
    console.log(this.state.searchQuery);
  };

  handleSearch = async (event) => {
    event.preventDefault();
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const res = await axios.get(API);
      console.log(res.data);
      this.setState({ location: res.data[0] });
      this.setState({ error: false });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });
      this.setState({ location: '' });
    }
  };

  render() {
    return (
      <>
        <Header />
        <Main handleInput={this.handleInput} handleSearch={this.handleSearch} location={this.state.location} error={this.state.error} errorMessage={this.state.errorMessage} />
        <Footer />
      </>
    );
  }
}

export default App;
