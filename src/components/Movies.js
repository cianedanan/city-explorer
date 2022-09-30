import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/App.css';

class Movies extends React.Component {
  render() {
    return (
      <>

        <Carousel style={{ backgroundColor: 'blue', height: '800px' }}>
          {this.props.movieData.map((data, idx) => {
            return (
              <Carousel.Item eventKey={idx}>
                <div id='carousel'>
                  <h2>{data.title}</h2>
                  <div id='carousel-content'>
                    <div>
                      <img src={data.image_url} alt='movie'></img>
                    </div>
                    <div id='car-data'>
											<h3>Overview</h3>
                      <p>{data.overview}</p>
                      <p>Average Votes: {data.avg_votes}</p>
                      <p>Total Votes: {data.total_votes}</p>
                      <p>Popularity: {data.popularity}</p>
                      <p>Release Date: {data.released_on}</p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    );
  }
}

export default Movies;
