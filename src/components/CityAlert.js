import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';

class CityAlert extends React.Component {
  render() {
    return (
      <>
        <Container>
          {this.props.location.place_id && (
            <>
              <Alert
                variant='success'
                style={{
                  margin: '50px',
                  boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)',
                }}
              >
                <h2>Location: {this.props.location.display_name}</h2>
                <h2>Latitude: {this.props.location.lat}</h2>
                <h2>Longitude: {this.props.location.lon}</h2>
              </Alert>
              <img
                style={{
                  display: 'block',
                  margin: 'auto',
                  boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)',
                  borderRadius: '5px',
                }}
                src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.props.location.lat},${this.props.location.lon}&zoom=12`}
                alt='map'
              />
            </>
          )}
          {this.props.error && (
            <Alert
              variant='danger'
              style={{
                margin: '50px',
                boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.125)',
              }}
            >
              <h2>Oh no! {this.props.errorMessage}</h2>
            </Alert>
          )}
        </Container>
      </>
    );
  }
}

export default CityAlert;
