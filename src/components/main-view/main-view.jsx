import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'

import './main-view.scss'

import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    axios
      .get('https://myflix-zag.herokuapp.com/movies')
      .then(response => {
        // never directly mutate state once defined, otherwise component won't update
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // register user
  onRegister(register) {
    this.setState({
      register
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // when clicked, this function sets selectedMovie state back to null, rendering the main-view page on the DOM
  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered*/
    // if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <React.Fragment>
        <div className='main-view'>
          <header>
            <Navbar bg='dark' variant='dark' fixed="top">
              <Nav>
                <Nav.Item>
                  <Nav.Link target='_blank' href='#Home'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link target='_blank' href='#Directors'>Directors</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link target='_blank' href='#Genres'>Genres</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className='logout-button' target='_blank' href='#Home'>Logout</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar>
          </header>
          <div className='main-body text-center'>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={() => this.onBackClick()}
              />
            ) : (
              <Container>
                <Row>
                  {movies.map((movie) => (
                    <Col xs={12} sm={6} md={4} key={movie._id}>
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        onClick={(movie) => this.onMovieClick(movie)}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}