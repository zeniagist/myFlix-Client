import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Card, Button, Container } from 'react-bootstrap';

import axios from 'axios';
import Config from '../../config'

import './movie-view.scss';
import { connect } from 'react-redux';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  // add favorite movie
  addFavorite = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.post(`${Config.API_URL}/users/${user}/Movies/${this.props.movie._id}`, {}, {
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
      <div className="container row bg-white rounded m-3 p-3">
        {/* Movie Image */}
        <div className='col-lg-6 d-flex justify-content-center movie-poster'>
          <img src={movie.ImagePath || ''} />
        </div>
        {/* Movie Title and Add to favorites */}
        <div className='col-lg-6 d-flex flex-column align-items-center justify-content-between'>
          <div className='movie-title d-flex justify-content-center align-items-center w-100 mb-2'>
            <span className='h1 mr-2 font-weight-bold'>
              {movie.Title || ''}
            </span>
          </div>
          <Link to={``}>
            <Button className='btn movie-view-btn' onClick={this.addFavorite}> Add to Favorites</Button>
          </Link>
          {/* Movie Description */}
          <div className='description mb-2'>
            <span>{movie.Description || ''}</span>
          </div>
          <div className='text-left w-100 mb-3'>
            {/* Director */}
            <div>
              <span className='label'>Director: </span>
              <Link to={`/directors/${movie.Director.Name}`} style={{ textDecoration: 'none' }}>
                <span>{movie.Director.Name || ''}</span>
              </Link>
            </div>
            {/* Genre */}
            <div>
              <span className='label'>Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`} style={{ textDecoration: 'none' }}>
                <span>{movie.Genre.Name || ''}</span>
              </Link>
            </div>
            {/* Back Button */}
            <Link to='/'>
              <Button className='ml-auto btn movie-view-btn'>
                Back to Movies
              </Button>
            </Link>
          </div>
        </div>
        {/* <Card className='movie-view-card'>
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
        </Card> */}
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