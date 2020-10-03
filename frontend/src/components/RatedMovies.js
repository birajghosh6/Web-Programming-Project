import React, { Component } from 'react'
import RatingItem from './RatingItem';
import notAuthorized from './notAuthorized'

export default class RatedMovies extends Component {

/*
    componentDidMount() {
        //console.log("ratedMovies:");
        //console.log(ratedMovies);
    }
*/
    render() {
        return this.props.userId.length===0 ? 
        notAuthorized()
        :
        (
            <div
                style = {{
                    backgroundColor: '#FFFF99',
                    //position: 'fixed',
                    height: '100%',
                    width: '100%'
                }}
            >
                <div style={{
                        backgroundColor: '#FFFF99',
                        //position: 'fixed',
                        width: '100%',
                        height: '100%',
                        marginTop: '0px'
                        }} 
                >
                    {this.props.ratedMovies.map(
                    movieItem => (
                        <RatingItem key={movieItem.movieId} movieItem= {movieItem} ratings={this.props.ratings} />
                    ))}
                </div>
            </div>
        );
    }
}
