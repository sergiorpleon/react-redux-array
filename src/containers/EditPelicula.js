import React, { Component } from 'react';
import { Redirect } from 'react-router'
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

//import { addPelicula } from '../actions';

//import AdminBar from '../components/admin/parts/AdminBar';
//import PropTypes from 'prop-types';

//const URL_HOME = "http://localhost:3004/users";

class EditPelicula extends Component {
//  constructor(props) {
//    super(props);
//  }

  generateFormPelicula() {

    return (

      <div className="box-body table-responsive no-padding">
            <div className="">
              <h2 className="col-sm-12 display-5">Edit Pelicula</h2>
            </div>
            <form className="">
                { this.props.editPelicula.title }
              <p className="col-sm-12">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="title"
                  name="title"
                  value={this.props.editPelicula.title}
                  onChange={this.props.onChangeInputEdit}
                />
              </p>
              <p className="col-sm-12">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="sinopsis"
                  name="sinopsis"
                  value={this.props.editPelicula.sinopsis}
                  onChange={this.props.onChangeInputEdit}
                />
              </p>
              <div className="container">
              <div className="row">
              <p className="col-sm-6">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="año"
                  name="lanzamiento"
                  value={this.props.editPelicula.lanzamiento}
                  onChange={this.props.onChangeInputEdit}
                />
              </p>
              <p className="col-sm-6">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="valoración"
                  name="valoracion"
                  value={this.props.editPelicula.valoracion}
                  onChange={this.props.onChangeInputEdit}
                />
              </p>
              </div>
              </div>
              <p className="col-sm-12">
                <button type="submit" className="btn btn-primary col-sm-12" onClick={this.props.handleSubmitEdit}>Editar</button>
              </p>
            </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.redirectnew ? <Redirect to="/" /> : <div className="contenido"> {this.generateFormPelicula()} </div>}
      </div>
    );
  }
}


/*
function mapStateToProps(state, props) {
  return {
    editPelicula: state.peliculas.new,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addPelicula }, dispatch);
}
*/
//export default connect(mapStateToProps, mapDispatchToProps)(editPelicula);
export default EditPelicula;
