import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import MovieCard from "./MovieCard";
import Button from '@material-ui/core/Button';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link to={`/update-movie/${this.props.match.params.id}`}>
          <Button>Update Movie</Button>
        </Link>
        <Link to={"/"}>
          <Button
            onClick={() => {
              this.deleteMovie(this.state.movie.id);
            }}
          >
            Delete Movie
          </Button>
        </Link>
      </div>
    );
  }
}
