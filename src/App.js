import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
      errorMEssage: '',
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
      console.log(res.data[0]);
      this.setState({ location: res.data[0] });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <>
        <input
          onChange={this.handleInput}
          placeholder='Search for a city'
        ></input>
        <button onClick={this.handleSearch}>Explore!</button>
        {this.state.location.place_id && (
          <>
            <h2>The City Location: {this.state.location.display_name}</h2>
            <h2>The lat: {this.state.lat}</h2>
            <h2>The lon: {this.state.lon}</h2>
          </>
        )}
        {this.state.error && <h2>Oh no! {this.state.errorMessage}</h2>}
      </>
    );
  }
}

export default App;
