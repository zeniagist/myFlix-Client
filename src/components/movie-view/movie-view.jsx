import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Card, Button } from 'react-bootstrap';

import axios from 'axios';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addFavorite = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.post(`https://myflix-zag.herokuapp.com/users/${user}/Movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`${this.props.movie.Title} added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Card className='movie-view-card'>
          <Card.Img className='movie-poster' variant="top" src={movie.ImagePath} />
          <Card.Title className='movie-title'>{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text className='movie-body'>{movie.Description}</Card.Text>

            <Card.Text className='movie-body'>
              Director:
                <Link to={`/directors/${movie.Director.Name}`} style={{ textDecoration: 'none' }}> {movie.Director.Name}</Link>
            </Card.Text>

            <Card.Text className='movie-body'>
              Genre:
              <Link to={`/genres/${movie.Genre.Name}`} style={{ textDecoration: 'none' }}> {movie.Genre.Name}</Link>
            </Card.Text>

            <Link to={``}>
              <Button className='addFavButton' variant='success' onClick={this.addFavorite}> Add Movie to Favorites</Button>
            </Link>
          </Card.Body>
          <Link to={`/`}>
            <Button className='back-button' variant='dark' >Return to Movie List</Button>
          </Link>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  // shape({...}) means it expects an object
  movie: PropTypes.shape({
    // movie prop may contain Title, and IF it does, it must be a string
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
  }),
  user: PropTypes.shape({
    username: PropTypes.string
  })
  // props object must contain onClick and it MUST be a function
  // onClick: PropTypes.func.isRequired
};