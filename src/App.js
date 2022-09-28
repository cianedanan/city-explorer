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
      weatherData: [],
    };
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = async (event) => {
    event.preventDefault();
    try {
      const resLocation = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.searchQuery}&format=json`);
      this.setState({ location: resLocation.data[0]});
      const resWeather = await axios.get(`http://localhost:3001/weather?searchQuery=${this.state.searchQuery}&lat=${resLocation.data[0].lat}&lon=${resLocation.data[0].lon}`);
      this.setState({weatherData: resWeather.data})
      this.setState({ error: false });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({ errorMessage: error.message});
      this.setState({ location: '' });
      this.setState({weatherData: []});
    }
  };

  render() {
    // console.log(this.state);
    return (
      <>
        <Header />
        <Main handleInput={this.handleInput} handleSearch={this.handleSearch} location={this.state.location} error={this.state.error} errorMessage={this.state.errorMessage} weatherData={this.state.weatherData}/>
        <Footer />
      </>
    );
  }
}

export default App;
