import React, { Component } from 'react'
import axios from 'axios';

export default class Home extends Component {

    state ={
        userId: 0
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("User ID:"+this.state.userId);
        this.props.setUserId(this.state.userId);
        axios
        .get(`http://localhost:9091/catalog/showratedmovie/${this.state.userId}`,{
            responseType: 'json'
        })
        .then(
            res => {
                
                this.props.setRatings(res.data);
                //working on fetching rated movies based on ratings array
                for (let i = 0; i < res.data.length; i++) {
                    axios.get(`http://localhost:9090/movieservice/movie/${parseInt(res.data[i].movieId)}`, {
                        responseType: 'json'
                    })
                    .then(
                        ratedMovie => {
                            this.props.setRatedMovies(ratedMovie.data);
                        }
                    )
                    .catch(
                        function(error) {
                            console.log(error);
                        }
                    );
                }

            },//could have used a catch method chaining with error function
            error => {
                console.log(error);
            }
        );
        
        this.setState({
            userId: 0
        });
    }

    onClickSubmitButton = (e) => {
        //console.log("Submit button clicked");
    }

    handleUserIdInput = (e) => {
        this.setState({
            userId: e.target.value
        });
    }

    render() {
        return (
            <div style={homePageStyle}>
                <form   style = {{
                            marginTop: '-65px',
                            marginBottom: '10px',
                            outline: '#000 auto 1px',
                            paddingBottom: '6px',
                            paddingTop: '5px',
                            backgroundColor: '#333',
                            color: '#DCC943',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '40%'
                        }}
                        onSubmit ={this.handleSubmit}
                >
                    <label htmlFor = 'usedId' >USER ID: </label>
                    <input 
                        type = 'text'
                        placeholder = 'Enter your ID..'
                        id = 'usedId'
                        name = 'usedId'
                        onChange = {this.handleUserIdInput}
                        value = {this.state.userId === 0 ? 
                                    '': this.state.userId}
                        style = {{
                            marginLeft: '20px',
                            marginRight: '20px',
                            height: '21px'
                        }}
                    />
                    <input  type = 'submit' 
                            value = 'Submit' 
                            onClick = {this.onClickSubmitButton}
                            style = {{
                                backgroundColor: '#DCC943',
                                color: 'black',
                                fontWeight: 'normal',
                                padding: '6px 10px',
                                outline: 'auto auto 4px',
                                marginLeft: '5px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                    />
                </form>
                <h2 style={{color:"black", 
                            //textShadow: '1px 1px 0px #000',
                            textShadow: '0px 0px 1px #000',
                            marginTop: '40px',
                            width: '60%',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                }}>
                    This is the homepage. This webpage allows you to add 
                    movies and rate them according to your liking. You 
                    may also update your previous ratings based on your 
                    new interests. Hope you have a great time browsing 
                    through our collection! <br />
                    <span style={{color: '#2F3274'}}>
                        Click on the links above to get started!
                    </span>
                </h2>
                
                
            </div>
        );
    }
}

const homePageStyle = {
    backgroundColor: '#FFFF99',
    textAlign: 'center',
    fontSize: '30',
    fontStyle: 'italic',
    lineHeight: '43px',
    fontWeight: 'bold',
    paddingTop: '10%',
    position: 'fixed',
    width: '100%',
    height: '100%'
}