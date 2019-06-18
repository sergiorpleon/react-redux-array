const URL_PELICULAS = "http://localhost:3004/peliculas";

export function moviesList() {
  return {
    type: 'MOVIES_LIST',
    payload: [
      {id:1, name:"Ana Colena"},
      {id:2, name:"Bob Colena"},
      {id:3, name:"Carol Colena"}
    ]
  }
}

export function getPeliculas() {
  const request = fetch(URL_PELICULAS, { method: 'GET' })
      .then(response => response.json())
  return {
      type: 'GET_PELICULAS',
      payload: request
  }
}

export function deletePelicula(pelicula) {
  let URL = URL_PELICULAS + '/' + pelicula.id;
  fetch(URL, {
      method: 'delete'
  }).then(response => response.json())


  const p = fetch(URL_PELICULAS, { method: 'GET' })
      .then(response => response.json())
  return {
      type: 'GET_PELICULAS',
      payload:
          p
  }
}

export function editPelicula(pelicula) {
  let URL = URL_PELICULAS + '/' + pelicula.id;
  fetch(URL, {
      method: 'put',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          title: pelicula.title,
          sinopsis: pelicula.sinopsis,
          lanzamiento: pelicula.lanzamiento,
          valoracion: pelicula.valoracion
      })

  }).then(response => response.json())


  const p = fetch(URL_PELICULAS, { method: 'GET' })
      .then(response => response.json())
  return {
      type: 'GET_PELICULAS',
      payload:
          p
  }
}

export function addPelicula(pelicula) {
  const uuidv1 = require('uuid/v1');

  let num = uuidv1();
  fetch(URL_PELICULAS, {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: 'p'+num,
          title: pelicula.title,
          sinopsis: pelicula.sinopsis,
          lanzamiento: pelicula.lanzamiento,
          valoracion: pelicula.valoracion,
      })

  }).then(    
    response => response.json()
    )

  const p = fetch(URL_PELICULAS, { method: 'GET' })
      .then(response => response.json())

  return {
        type: 'GET_PELICULAS',
        payload: p
  }
  /*
  return {
      type: 'NEW_PELICULA',
      payload: p
  }
  */
}

export function passPelicula(pelicula) {

  return {
      type: 'PASS_PELICULA',
      payload:  pelicula
  }
}

export function quitPelicula(pelicula) {

  return {
      type: 'QUIT_PELICULA',
      payload:  pelicula
  }
}

export function passHashPelicula(pelicula) {

  return {
      type: 'PASS_HASHPELICULA',
      payload:  pelicula
  }
}

export function quitHashPelicula(pelicula) {

  return {
      type: 'QUIT_HASHPELICULA',
      payload:  pelicula
  }
}