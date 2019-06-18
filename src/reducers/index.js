import { combineReducers } from 'redux'
// import { HELLO_WORLD, RESET } from './../actions'
import peliculas from './peliculas_reducers';

//let initialState = { message: 'Hello' }

const movies = (state=null, action) => {
  switch (action.type) {
    case 'MOVIES_LIST':
      return action.payload;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  movies, peliculas
})

export default rootReducer
