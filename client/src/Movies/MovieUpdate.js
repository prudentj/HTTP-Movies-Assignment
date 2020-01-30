import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieCard from "./MovieCard";

import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const initialMovie = {
    id: Date.now,
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const MovieUpdate = props => {

    const [updatedMovie, setUpdatedMovie] = useState({ initialMovie });

    const baseurl = `http://localhost:5000/api/movies/`;
    useEffect(() => {
        axios
            .get(`${baseurl}${props.match.params.id}`)
            .then(res => { setUpdatedMovie(res.data) })
            .catch(error => console.log(error.response))
    }, []);

    const handleChangesTitle = el => { setUpdatedMovie({ ...updatedMovie, title: el.target.value }) }
    const handleChangesDir = el => { setUpdatedMovie({ ...updatedMovie, director: el.target.value }) }
    const handleChangesMeta = el => { setUpdatedMovie({ ...updatedMovie, metascore: el.target.value }) }

    const handleSubmit = el => {
        el.preventDefault();
        axios
            .put(`${baseurl}${props.match.params.id}`, updatedMovie)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        props.history.push(`/movies`)

    };

    return (
        <Container>

            <form>
                <TextField
                    id='title'
                    label='title'
                    value={updatedMovie.title}
                    onChange={handleChangesTitle}
                />
                <TextField
                    id='director'
                    label='director'
                    value={updatedMovie.director}
                    onChange={handleChangesDir}
                />
                <TextField
                    id='metascore'
                    label='metascore'
                    value={updatedMovie.metascore}
                    onChange={handleChangesMeta}
                />
                <Button onClick={handleSubmit}>
                    Update Movie
                </Button>

            </form>

        </Container>
    )
};

export default MovieUpdate;
