import React from 'react';
import axios from 'axios';

import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
// import CityDisplay from './components/CityDisplay.js';
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
            <Form.Group className='mb-3' controlId='location'>
              <Form.Label></Form.Label>
              <Form.Control
                type='location'
                placeholder='Search for a city'
                onChange={this.handleInput}
              />
              <Form.Text className='text-muted'></Form.Text>
            </Form.Group>
            <Button variant='primary' type='click' onClick={this.handleSearch}>
              Explore
            </Button>
          </Form>
        </Container>
        
        <Alert show={'false'} variant='success'>
        {this.state.location.place_id && 
          <>
            <h2>The city is: {this.state.location.display_name}</h2>
            <h2>The lat is: {this.state.location.lat}</h2>
            <h2>The lon is: {this.state.location.lon}</h2>
          </>
        }
        {this.state.error && 
          <h2>Oh no! {this.state.errorMessage}</h2>
        }
        </Alert>
      </>
    );
  }
}

export default App;
