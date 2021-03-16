import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Container } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className='container'>
        <Card className='movie-card'>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img className='movie-card' variant="top" src={movie.ImagePath} />
          </Link>
        </Card>
      </div>
    );
  }
}

// export class MovieCard extends React.Component {
//   render() {
//     const { movie } = this.props;

//     return (
//       <Card className='movie-card'>
//         <Link to={`/movies/${movie._id}`}>
//           <Card.Img className='movie-img' variant='top' src={movie.ImagePath} />
//         </Link>
//       </Card>
//     );
//   }
// }

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
  }).isRequired
  // props object must contain onClick and it MUST be a function
  // onClick: PropTypes.func.isRequired
};