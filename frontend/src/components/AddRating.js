import React, { Component } from 'react'
import notAuthorized from './notAuthorized'

export default class AddRating extends Component {
    state ={
        unratedMovies: [],
        newRatedMovieId: 0,
        userId: this.props.userId,
        newRating: 0
    }
    componentDidMount() {
        let ratedMovieIds = [];
        for (let i = 0; i< this.props.ratedMovies.length; i++) {
          ratedMovieIds.push(this.props.ratedMovies[i].movieId);
        }
        this.setState({
            unratedMovies: [...this.props.movies.filter(
                movieItr => !ratedMovieIds.includes(movieItr.movieId)
            )]
        })
            console.log(this.props.movies.length);
            console.log(this.props.ratedMovies.length)
        
    }

    handleDropDownChange = (e) => {
        if(parseInt(e.target.value)!==0) {
            this.state.unratedMovies.map(
                unratedMovieItr => {
                    if(unratedMovieItr.movieId === parseInt(e.target.value)){
                      this.setState({
                        newRatedMovieId: unratedMovieItr.movieId
                      })
                    }
                      return this.state.newRatedMovieId;//useless
                  }
              );
            
        }//close of if statement
        else {
            this.setState({
                newRatedMovieId: 0,
                newRating: 0,
                value: parseInt(e.target.value)
            });
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.addRating({
            movieId: this.state.newRatedMovieId,
            userId: this.state.userId,
            rating: this.state.newRating
        });
        this.setState({
            value: 0,
            newRatedMovieId: 0,
            newRating: 0
        })
    }

    handleRatingNumber = (e) => {
        this.setState({
            newRating: e.target.value
        });
    }

    render() {
        //console.log(this.state.unratedMovies);
        if(this.state.unratedMovies.length===0)
        {
            return notAuthorized();
        }
        else 
        {
            return this.props.userId.length===0 ? 
            notAuthorized()
            :
            (
                <div style={{
                    backgroundColor: '#FFFF99',
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                    }}>
                    <form   onSubmit={this.handleFormSubmit} 
                            style={{
                                padding: '20px',
                                marginTop: '20px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                textAlign: 'center',
                                borderRadius: '8px',
                                border: '2px solid #ccc',
                                boxSizing: 'border-box',
                                width: '65%',
                                backgroundColor: '#DCC943'
                    }}>
                        <select value={this.state.value} onChange={this.handleDropDownChange} style={{fontSize: '20px'}}>
                            <option value="" >
                            Select Movie--
                            </option>
                            {
                                this.state.unratedMovies.map(
                                    unratedMovieItr => (
                                        <option key={unratedMovieItr.movieId} value={""+unratedMovieItr.movieId} >
                                            {unratedMovieItr.movie_name}
                                        </option>
                                    )
                                )
                            }
                        </select>
                        <br />
                        <br />
                        {"Rate it: "}
                        <input type='number' value={this.state.newRating} onChange={this.handleRatingNumber} />
                        <br/>
                        <br />
                        <input type="submit" value="Add Rating" style={{
                            cursor: 'pointer',
                            backgroundColor: 'green',
                            marginBottom: '5px',
                            padding: '8px',
                            color: '#fff',
                            border: '5px solid deepgreen',
                            borderRadius: '5px'
                    }} />
                    </form>
                </div>
            )
        }
    }
}