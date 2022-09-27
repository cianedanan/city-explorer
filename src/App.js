import React from 'react';
import axios from 'axios';
import './css/App.css';

import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import Alert from 'react-bootstrap/Alert';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
        <Main />
        <Footer />

        <Container>
          <Form>
            <Form.Group>
    
              <Form.Control style={{boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)'}}
                type='location'
                placeholder='Search for a city'
                onChange={this.handleInput}
              />
              <Button variant='primary' type='click' onClick={this.handleSearch} class="p-2">
              Explore now!
            </Button>
            </Form.Group>
            
          </Form>

          {this.state.location.place_id && (
            <>
              <Alert variant='success' style={{margin: '50px', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)'}} >
                <h2>Location: {this.state.location.display_name}</h2>
                <h2>Latitude: {this.state.location.lat}</h2>
                <h2>Longitude: {this.state.location.lon}</h2>
              </Alert>
              <img style={{display: 'block', margin: 'auto', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)', borderRadius: '5px'}}
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=12`}
            alt='map'
          />
            </>
          )}
          {this.state.error && (
            <Alert variant='danger' style={{margin: '50px', boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)'}}>
              <h2>Oh no! {this.state.errorMessage}</h2>
            </Alert>
          )}
        </Container>

      </>
    );
  }
}

export default App;
