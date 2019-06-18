import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewPelicula from './NewPelicula.js';
import EditPelicula from './EditPelicula.js';
import { getPeliculas, addPelicula, editPelicula, deletePelicula, passPelicula, quitPelicula, passHashPelicula, quitHashPelicula } from '../actions';


class ListaPeliculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementos: { 
        peliculas: this.props.peliculas ? this.props.peliculas : [],
        preferidas: this.props.preferidas ? this.props.preferidas : [],
        hashpreferidas: this.props.hashpreferidas ? this.props.hashpreferidas : [],
        newPelicula:{
          "title": "",
          "sinopsis": "",
          "lanzamiento": "",
          "valoracion": "",
        },
        editPelicula:{
          "id": "",
          "title": "",
          "sinopsis": "",
          "lanzamiento": "",
          "valoracion": "",
        },
        filtered: [],
        first: "",
        keyword: "",
        menor: "",
        mayor: "",
        edit: false,
      },
    };
  }

  generatePeliculas(peliculas) {
    if (peliculas) {
      return (
        <div className="">
            
          {
            peliculas.map((item) => {
              return (

                <div key={item.id} className="col-sm-12">
                  
                    <div className="text-grid-product card card-space">
                      <h3 className="title">{item.title}</h3>
                      <div><strong>Año: {item.lanzamiento}</strong><span className="float-right bg-info btn-info bg-circle">{item.valoracion}</span></div>
                      <div className="sinopsis">{item.sinopsis}</div>
                      <div>
                      <button className="btn-primary btn-default btn-buy" onClick={() => this.addPeliculas(item)} ><span className="glyphicon glyphicon-shopping-cart"></span><i className="fa fa-fw fa-cart-plus"></i>Array+</button>      
                      <button className="btn-primary btn-default btn-buy" onClick={() => this.addHashPeliculas(item)} ><span className="glyphicon glyphicon-shopping-cart"></span><i className="fa fa-fw fa-cart-plus"></i>Hash+</button>      
                      <button className="btn-warning btn-default btn-buy" onClick={() => this.editPeliculas(item)} ><span className="glyphicon glyphicon-shopping-cart"></span><i className="fa fa-fw fa-cart-plus"></i>Edit</button>      
                      <button className="btn-danger btn-default btn-buy" onClick={() => this.deletePeliculas(item)} ><span className="glyphicon glyphicon-shopping-cart"></span><i className="fa fa-fw fa-cart-plus"></i>X</button>      
                    </div>
                    </div>
                </div>

              )
            })
          }
        </div>

      )
    }
  }

  generatePreferidas(preferidas) {
    if (preferidas) {
      return (
        <div className=""> 
          {
            preferidas.map((item) => {
              return (
                <div key={item.id} className="col-sm-12">
                    <div className="text-grid-product card card-space">
                      <h3 className="title">{item.title}</h3>
                      <div><strong>Año: {item.lanzamiento}</strong><span className="float-right bg-info btn-info bg-circle">{item.valoracion}</span></div>
                      <div className="sinopsis">{item.sinopsis}</div>
                      <div className="cantidad"><strong className="float-right">{item.cantidad}</strong></div>
                      <button className="btn btn-primary btn-default btn-buy" onClick={() => this.quitPeliculas(item)} ><span className="glyphicon glyphicon-shopping-cart"></span><i className="fa fa-fw fa-cart-plus"></i>QUITAR</button>      
                      
                    </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  generateHashPreferidas(byId, preferidas) {
    
    if (byId) {
      return (
        <div className=""> 
          {
            byId.map((item) => {
              return (       
                <div key={preferidas[item].id} className="col-sm-12">
                    <div className="text-grid-product card card-space">
                      <h3 className="title">{preferidas[item].title}</h3>
                      <div><strong>Año: {preferidas[item].lanzamiento}</strong><span className="float-right bg-info btn-info bg-circle">{preferidas[item].valoracion}</span></div>
                      <div className="sinopsis">{preferidas[item].sinopsis}</div>
                      <div className="cantidad"><strong className="float-right">{preferidas[item].cantidad}</strong></div>
                      <button className="btn btn-primary btn-default btn-buy" onClick={() => this.quitHashPeliculas(preferidas[item])} ><span className="glyphicon glyphicon-shopping-cart"></span><i className="fa fa-fw fa-cart-plus"></i>QUITAR</button>      
                    </div>
                </div>
                )
              })
            }
        </div>
      )
    }
  }

  generateFiltered() {
    if (true) {
      return (
        <div className="">
            
          {
            this.state.elementos.filtered.map((item) => {
              return (

                <div key={item.id} className="col-sm-12">
                  
                    <div className="text-grid-product card card-space">
                      <h3 className="title">{item.title}</h3>
                      <div><strong>Año: {item.lanzamiento}</strong><span className="float-right bg-info btn-info bg-circle">{item.valoracion}</span></div>
                      <div className="sinopsis">{item.sinopsis}</div>
                    </div>
                </div>

              )
            })
          }
        </div>

      )
    }
  }

  filteredTitle = (event) => {
    event.preventDefault();
    
      let newstate = this.state;
      newstate.elementos.keyword = event.target.value;
      this.setState(newstate);

      this.filtered();
    
  }

  filteredMenor = (event) => {
    event.preventDefault();
    
      let newstate = this.state;
      newstate.elementos.menor = event.target.value;
      this.setState(newstate);

      this.filtered();
  }

  filteredMayor = (event) => {
    event.preventDefault();
    
      let newstate = this.state;
      newstate.elementos.mayor = event.target.value;
      this.setState(newstate);

      this.filtered();
  }

  filtered(){
    let list = this.state.elementos.peliculas;
    if(this.state.elementos.mayor !== ""){
       list = list.filter( (item)=>{
      return item.valoracion < this.state.elementos.mayor;
      })
      let newstate = this.state;
      newstate.elementos.filtered = list;
      this.setState(newstate);
    }
    if(this.state.elementos.menor !== ""){
      list = list.filter( (item)=>{
     return item.valoracion > this.state.elementos.menor;
     })
     let newstate = this.state;
     newstate.elementos.filtered = list;
     this.setState(newstate);
   }
   if(this.state.elementos.keyword !== ""){
    list = list.filter( (item)=>{
    return item.title.toLowerCase().indexOf(this.state.elementos.keyword.toLowerCase())>-1;
   })
  }

   let newstate = this.state;
   newstate.elementos.filtered = list;
   this.setState(newstate);

  }

  onChangeInput = (event) => {
      event.preventDefault();
      let newstate = this.state;
    switch(event.target.name){
        case 'title': newstate.elementos.newPelicula.title = event.target.value; break;
        case 'sinopsis': newstate.elementos.newPelicula.sinopsis = event.target.value; break;
        case 'lanzamiento': newstate.elementos.newPelicula.lanzamiento = event.target.value; break;
        case 'valoracion': newstate.elementos.newPelicula.valoracion = event.target.value; break;
        default: ;break;
    }
      this.setState(
        newstate
      );
  }

  onChangeInputEdit = (event) => {
    event.preventDefault();
      let newstate = this.state;
    switch(event.target.name){
        case 'title': newstate.elementos.editPelicula.title = event.target.value; break;
        case 'sinopsis': newstate.elementos.editPelicula.sinopsis = event.target.value; break;
        case 'lanzamiento': newstate.elementos.editPelicula.lanzamiento = event.target.value; break;
        case 'valoracion': newstate.elementos.editPelicula.valoracion = event.target.value; break;
        default: ;break;
    }
      this.setState(
        newstate
      );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newPelicula = this.state.elementos.newPelicula;
    this.props.addPelicula(newPelicula);
  }
  handleSubmitEdit = (event) => {
    event.preventDefault();
    let editPelicula = this.state.elementos.editPelicula;
    this.props.editPelicula(editPelicula);
    let newstate = this.state;
    newstate.elementos.edit = false;
    this.setState(
      newstate
    );
  }


  editPeliculas = (pelicula) => {
    let newstate = this.state;
    newstate.elementos.editPelicula = { 'id': pelicula.id, 'title': pelicula.title , 'sinopsis': pelicula.sinopsis, "lanzamiento": pelicula.lanzamiento, "valoracion": pelicula.valoracion };
    newstate.elementos.edit = true;
    this.setState(
      newstate
    );
}

addPeliculas = (pelicula) => {
  this.props.passPelicula({ 'id': pelicula.id, 'title': pelicula.title , 'sinopsis': pelicula.sinopsis, "lanzamiento": pelicula.lanzamiento, "valoracion": pelicula.valoracion });
}

addHashPeliculas = (pelicula) => {
  this.props.passHashPelicula({ 'id': pelicula.id, 'title': pelicula.title , 'sinopsis': pelicula.sinopsis, "lanzamiento": pelicula.lanzamiento, "valoracion": pelicula.valoracion});
}

deletePeliculas = (pelicula) => {
  this.props.deletePelicula({ 'id': pelicula.id});
}

  quitPeliculas = (pelicula) => {
    this.props.quitPelicula({ 'id': pelicula.id, 'title': pelicula.title , 'sinopsis': pelicula.sinopsis, "lanzamiento": pelicula.lanzamiento, "valoracion": pelicula.valoracion });

  }

  quitHashPeliculas = (pelicula) => {
    this.props.quitHashPelicula({ 'id': pelicula.id, 'title': pelicula.title , 'sinopsis': pelicula.sinopsis, "lanzamiento": pelicula.lanzamiento, "valoracion": pelicula.valoracion });

  }


  componentWillReceiveProps(nextProps) {
    let newstate = this.state;
    newstate.elementos.peliculas = nextProps.peliculas;
    newstate.elementos.preferidas = nextProps.preferidas;
    newstate.elementos.hashpreferidas = nextProps.hashpreferidas;
    newstate.elementos.byId = nextProps.byId;
    if(newstate.elementos.first === ""){
      newstate.elementos.first = "load";
      newstate.elementos.filtered = nextProps.peliculas;
    }
    this.setState(newstate);
  }

  componentDidMount() {
    this.props.getPeliculas();
  }


  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-sm-3">
        {
            
          (this.state.elementos.edit)?
            <EditPelicula editPelicula={this.state.elementos.editPelicula} onChangeInputEdit={this.onChangeInputEdit.bind(this)} handleSubmitEdit={this.handleSubmitEdit.bind(this)}/>  
          :
            <NewPelicula newPelicula={this.state.elementos.newPelicula} onChangeInput={this.onChangeInput.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>  
          }

          <div className="box-body table-responsive no-padding">
            <div className="">
              <h2 className="col-sm-12 display-5">Filtrar Pelicula</h2>
            </div>
            <form className="">
              <p className="col-sm-12">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="title"
                  name="title"
                  onChange={this.filteredTitle}
                />
                </p>
                <div className="container">
              <div className="row">
              <p className="col-sm-6">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="mayor"
                  name="menor"
                  onChange={this.filteredMenor}
                />
              </p>
              <p className="col-sm-6">
                <input
                  className="col-sm-12"
                  type="text"
                  placeholder="menor"
                  name="mayor"
                  onChange={this.filteredMayor}
                />
              </p>
              </div>
              </div>
              
            </form>
          </div>
          <div className="contenido"> {this.generateFiltered()} </div>
        </div>
        <div className="col-sm-3">
          <div className="contenido"> {this.generatePeliculas(this.props.peliculas)} </div>  
        </div>
        <div className="col-sm-3">
        <h2 className="col-sm-12 display-5">Array de preferidos</h2>
          <div className="contenido"> {this.generatePreferidas(this.props.preferidas)} </div>
        </div>
        <div className="col-sm-3">
          <h2 className="col-sm-12 display-5">Hash de preferidos</h2>
          <div className="contenido"> {this.generateHashPreferidas(this.props.byId, this.props.hashpreferidas)} </div>
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newPelicula: state.peliculas.new,
    peliculas: state.peliculas.peliculas,
    preferidas: state.peliculas.preferidas,
    hashpreferidas: state.peliculas.hashpreferidas,
    byId: state.peliculas.byId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPeliculas, addPelicula, editPelicula, deletePelicula, passPelicula, quitPelicula, passHashPelicula, quitHashPelicula }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaPeliculas);
