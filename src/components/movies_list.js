import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class MovieList extends Component{
    componentWillMount(){
        this.props.moviesList()
    }

    renderList = (movies) =>{
        if(movies){
            return movies.map((movie) => {
                return(
                    <div>{movie.name}</div>
                )
            })
        }
    }
    render(){
        return (
            <div>
                {this.renderList(this.props.movies)}
            </div>
        )
    }

}
function mapStateToProps(state){
    return{
      movies: state.movies
    }
}
  
export default connect(mapStateToProps, actions)(MovieList);
  