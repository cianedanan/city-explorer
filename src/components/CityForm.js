import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class CityForm extends React.Component {
  
  render() {
 
    return (
      <>
        <Container>
          <Form>
            <Form.Group>
              <Form.Control
                style={{ boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)' }}
                type='location'
                placeholder='Search for a city'
                onChange={this.props.handleInput}
              />
              <Button
                variant='primary'
                type='click'
                onClick={this.props.handleSearch}
                class='p-2'
              >
                Explore now!
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </>
    );
  }
}

export default CityForm;
