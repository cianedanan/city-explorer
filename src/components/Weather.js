import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';

class Weather extends React.Component {
  render() {
    return (
      <>
			<Container>
        <h2>Weather Forecast</h2>
        {this.props.weatherData.map((forecast, idx) => {
          return (
            <Accordion defaultActiveKey='0' flush>
              <Accordion.Item eventKey={idx} >
                <Accordion.Header>{forecast.date}</Accordion.Header>
                <Accordion.Body>{forecast.description}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}
				</Container>
      </>
    );
  }
}

export default Weather;
