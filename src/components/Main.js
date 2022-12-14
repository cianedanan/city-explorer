
import React from 'react';
import axios from 'axios';

import CityForm from './CityForm.js';
import CityAlert from './CityAlert.js';
import Weather from './Weather.js';
import Movies from './Movies.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
      errorMessage: '',
      weatherData: [],
      movieData:[],
      lat: '',
      lon: '',
    };
  }

  handleInput = (event) => {
    event.preventDefault();
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = async (event) => {
    event.preventDefault();
    try {
      const resLocation = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.searchQuery}&format=json`
      );
      this.setState({ location: resLocation.data[0] });
      this.setState({ lat: resLocation.data[0].lat }, () => this.getMovies());
      this.setState({ lon: resLocation.data[0].lon }, () => this.getWeather());
      
      // this.getWeather();
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });
      this.setState({ location: '' });
      this.setState({ weatherData: [] });
      this.setState({ movieData: []});
    }
  };

  getWeather = async () => {
    
    try {
      const API = process.env.REACT_APP_API_URL;
      const url = `${API}/weather`;
      const resWeather = await axios.get(url, {
        params: {
          lat: this.state.lat,
          lon: this.state.lon,
        },
      });
      this.setState(
        { weatherData: resWeather.data },
      );
      this.setState({ error: false });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });
    }
  };

  getMovies = async () =>{
    
    try{
      const API = process.env.REACT_APP_API_URL;
      const url = `${API}/movies`;
      const resMovies = await axios.get(url, {
        params: {
          searchQuery: this.state.searchQuery,
        },
      });
      
      this.setState({ movieData: resMovies.data });
    }catch(error){
      console.log(error);
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });
    }
  };
  
  render() {
    return (
      <>
        <CityForm handleInput={this.handleInput} handleSearch={this.handleSearch}/>
            <CityAlert location={this.state.location} error={this.state.error} errorMessage={this.state.errorMessage}/>
           <Weather weatherData={this.state.weatherData}/>
            <Movies movieData={this.state.movieData}/>
      </>
    )
  }
}

export default Main;
