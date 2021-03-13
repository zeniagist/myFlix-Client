import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardGroup } from 'react-bootstrap';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card className='movie-card' onClick={() => onClick(movie)} >
        <Card.Img className='movie-img' variant='top' src={movie.ImagePath} />
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string
    }),
    Featured: PropTypes.bool
  }).isRequired,
  // props object must contain onClick and it MUST be a function
  onClick: PropTypes.func.isRequired
};