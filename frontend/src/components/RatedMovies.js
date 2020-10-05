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
            this.props.ratings.length===0?
            (
                <div style = {{
                    backgroundColor: '#FFFF99',
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    fontSize: '30px',
                    paddingLeft: 'auto',
                    paddingRight: 'auto',
                    paddingTop: 'auto',
                    paddingBottom: 'auto'
                }}>
                   {/* <center>Loading.....</center> */}
                    <br/>
                    <center>
                        You have not rated any movies {" "}
                        <span style={{color: 'blue', fontWeight: 'bold'}}>{this.props.userId}</span>
                    </center>
                </div>
            )
            :
            (
                <div style = {{
                        backgroundColor: '#FFFF99',
                        //position: 'fixed',
                        height: '100%',
                        width: '100%'
                    }}>

                    <div style={{
                            backgroundColor: '#FFFF99',
                            //position: 'fixed',
                            width: '100%',
                            height: '100%',
                            marginTop: '0px'
                            }}>
                        {this.props.ratedMovies.map(
                        movieItem => (
                            <RatingItem key={movieItem.movieId} movieItem= {movieItem} ratings={this.props.ratings} />
                        ))}
                    </div>
                    
                </div>
            )
        );
    }
}
