import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Movies from './components/Movies';
import RatedMovies from './components/RatedMovies';
import AddMovie from './components/AddMovie';
import UpdateMovie from './components/UpdateMovie';
import Home from './components/Home';
import axios from 'axios';
import AddRating from './components/AddRating';
import Cookies from 'js-cookie'

class App extends Component {

  state = {
    movies: [],
    //userId: '',
    //password: '',
    ratedMovies: [],//has same structure as movies
    ratings: [],
    solidYellow: '#DCC943',
    titleBlack: '#333',
    pastelYellowBackground: '#FFFF99',
    navbarBlue: '#2F3274',
    fadedBlueBackground: '#7FD1E8'
  }
  
  componentDidMount() {
    axios
      .get('http://localhost:9091/catalog/showmovies', {
        responseType: 'json'
      })
      .then(res => 
        this.setState({
          movies: res.data
        })
      )
      .catch(function(error) {
        console.log(error);
      });
  }

  addMovie = (newMovie) => {
    axios
    .post('http://localhost:9090/movieservice/addmovie', newMovie,
    //{responseType: 'json'}
    )
    .then(res => 
      this.setState({
      movies: [...this.state.movies, res.data]
      })
    )
    .catch(function(error) {console.log(error)});
    alert("Movie Name: " +
            newMovie.movie_name +
            "\n\nSuccessfully updated!"
      );
  }

  updateMovie = (updatedMovie) => {
    axios
      .put(`http://localhost:9090/movieservice/updatemovie/${updatedMovie.movieId}`, 
            updatedMovie)
      .then(res =>  {
        this.setState({
          movies: [...this.state.movies.filter(movieItr => movieItr.movieId!==updatedMovie.movieId), 
                  res.data]
        });
        let tempRatedMovies = [...this.state.ratedMovies.filter(
          ratedMovieItr => ratedMovieItr.movieId !== res.data.movieId
        )];
        if(tempRatedMovies.length !== this.state.ratedMovies.length)
          this.setState({
            ratedMovies: [...tempRatedMovies,res.data]
          });
      })
      .catch(
        function (error) {console.log(error);}
      );
      alert("Movie Name: " +
            updatedMovie.movie_name +
            "\n\nSuccessfully updated!"
      );
  }
  addRating = (newRatedMovie) => {
    //console.log(newRatedMovie);
    axios
      .post('http://localhost:9092/ratingservice/addrating',newRatedMovie)
      .then(
        res => {
          this.setState({
            ratings: [...this.state.ratings,res.data]
          });
          //start of inner axios
          axios.get(`http://localhost:9090/movieservice/movie/${res.data.movieId}`)
          .then(
            res2 => {
              this.setState({
                ratedMovies: [...this.state.ratedMovies,res2.data]
              });
              // console.log("Addition to rated movies");
              // console.log(res2.data);
            }
          )
          .catch(
            function(error) {console.log(error);}
          );
          //end of inner axios
        }
      )
      .catch(
        function(error) {console.log(error);}
      )
    
  }

  setUser = (receivedUser) => {
    this.setState({
      ratedMovies: [],
      ratings: []
    });
    axios
    .post('http://localhost:9095/login/checkUser', receivedUser)
    .then(
      res => {
        // res.data ?
        //   this.setState({
        //     userId: receivedUser.userId,
        //     password: receivedUser.password
        //   })
        //   :
        //   this.setState({
        //     userId: '',
        //     password: ''
        //   })
        if(res.data){
          Cookies.set('userId',receivedUser.userId);
          Cookies.set('password',receivedUser.password);
        }
      }
    )
    .catch(function(error){console.log(error)});
  }

  setRatedMovies = (ratedMovie) => {
    this.setState({
      ratedMovies: [...this.state.ratedMovies,ratedMovie]
    });
  }

  setRatings = (newRatings) => {
    this.setState({
      ratings: newRatings
    });
  }

  render() {
    
    return (
      //this.state.movies.length!==0 ?
      <BrowserRouter>
        <header style={headerStyle}>
          <h1 
            style={{
              fontFamily: "Brush Script MT", 
              fontSize: "60px",
              paddingTop: '25px',
              paddingBottom: '-5px',
              marginTop: '-10px'
            }} 
          >
            Movie Time
          </h1>
          <h3 style = {{
            textAlign: 'right',
            marginRight: '20px',
            fontWeight: 'normal',
            paddingBottom: '0px'
          }} > 
            Active User : {" "}
              <span style={{
                color: 'lightblue',
                textShadow: '0px 0px 3px blue',
                fontWeight: 'bolder'
              }}>
                {/* {this.state.userId === '' ? 'None':this.state.userId} */}
                {Cookies.get('userId') ? Cookies.get('userId'): 'None'}
              </span>
          </h3>
          
        </header>
        <div 
          className="navbar" 
          style={{ 
              backgroundColor: "#DCC943", 
              padding:"10px", 
              textAlign: "center",
              width: '100%',
              marginTop: '-19px',
              //textShadow: '1px 1px 2px #333',
              fontWeight: 'bolder'
          }}
        >
          <Link to="/home" style={linkStyle}>Home</Link>
          |
          <Link to="/showmovies" style={linkStyle}>All Movies</Link>
          |
          <Link to="/showratedmovies" style={linkStyle}>User Ratings</Link>
          |
          <Link to="/addrating" style={linkStyle}>Add Ratings</Link>
          |
          <Link to="/addmovie" style={linkStyle}>Add Movie</Link>
          |
          <Link to="/updatemovie" style={linkStyle}>Update Movies</Link>
        </div>
        <div>
          {/* <Route exact path="/" render = { props => (
            <React.Fragment>
                <Home />
            </React.Fragment>
          )} /> */}
          <Route exact path={["/home","/"]} render = { props => (
            <React.Fragment>
                <Home 
                  setUser= {this.setUser}
                  setRatings ={this.setRatings}
                  setRatedMovies = {this.setRatedMovies}
                />
            </React.Fragment>
          )} />
          <Route exact path="/showmovies" render= { props => (
            <React.Fragment>
              <Movies movies= {this.state.movies} userId = {/*this.state.userId*/ Cookies.get('userId')?Cookies.get('userId'):''} />
            </React.Fragment>
          )} />
          <Route exact path="/showratedmovies" render = { props => (
            <React.Fragment>
                <RatedMovies 
                  ratedMovies ={this.state.ratedMovies}
                  ratings = {this.state.ratings}
                  userId = {/*this.state.userId*/ Cookies.get('userId')?Cookies.get('userId'):''}
                />
            </React.Fragment>
          )} />
          <Route exact path="/addrating" render = { props => (
            <React.Fragment>
                <AddRating  addRating= {this.addRating} 
                            userId= {/*this.state.userId*/ Cookies.get('userId')?Cookies.get('userId'):''}
                            movies= {this.state.movies}
                            ratedMovies= {this.state.ratedMovies}
                />
            </React.Fragment>
          )} />
          <Route exact path="/addmovie" render = { props => (
            <React.Fragment>
                <AddMovie addMovie= {this.addMovie} userId = {/*this.state.userId*/ Cookies.get('userId')?Cookies.get('userId'):''} />
            </React.Fragment>
          )} />
          <Route exact path="/updatemovie" render = { props => (
            <React.Fragment>
                <UpdateMovie updateMovie={this.updateMovie} userId = {/*this.state.userId*/ Cookies.get('userId')?Cookies.get('userId'):''} />
            </React.Fragment>
          )

          } />
        </div>
        
      </BrowserRouter>
      /*:
      (<div style={homePageStyle}>
            Loading...
      </div>)*/
      
    );
  }
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  textDecoration: 'none',
  marginBottom: '0px'
}

const linkStyle = {
  //color: '#FFF',
  textDecoration: 'none',
  marginTop: '-20px',
  padding: '10px 30px',
  fontFamily: 'Copperplate',
  fontSize: '18px'
  
}

export default App;

