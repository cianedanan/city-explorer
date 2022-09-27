import React from 'react';

class CityDisplay extends React.Component {
  render() {
    return (
      <>
        {this.props.location.place_id && 
          <>
            <h2>The city is: {this.props.location.display_name}</h2>
            <h2>The lat is: {this.props.location.lat}</h2>
            <h2>The lon is: {this.props.location.lon}</h2>
          </>
        }
        {this.state.error && 
          <h2>Oh no! {this.props.errorMessage}</h2>
        }
      </>
    );
  }
}

export default CityDisplay;
