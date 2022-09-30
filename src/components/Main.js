
import React from 'react';
import CityForm from './CityForm.js';
import CityAlert from './CityAlert.js';
import Weather from './Weather.js';
import Movies from './Movies.js';

class Main extends React.Component {

  render() {
    return (
      <>
        <CityForm handleInput={this.props.handleInput} handleSearch={this.props.handleSearch}/>
				<CityAlert location={this.props.location} error={this.props.error} errorMessage={this.props.errorMessage}/>
        <Weather weatherData={this.props.weatherData}/>
        <Movies movieData={this.props.movieData}/>
      </>
    )
  }
}

export default Main;
