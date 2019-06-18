const initialstate = {
    preferidas: [
      
    ],
    byId: [],
    hashpreferidas: [
      
    ],
    peliculas: [
      
    ],
}

export default function(state=initialstate, action){

    switch(action.type){
        case 'GET_PELICULAS': {
            return {
                ...state,
                peliculas: action.payload
            } 
        }
        case 'SAVE_PELICULA':{
            return {
                ...state,
                peliculas :  action.payload
            }
        }
        case 'NEW_PELICULA':{

            return {
                ...state,
                peliculas :  action.payload
            }
        }
        case 'PASS_PELICULA': {
            let theitem = {};
            const prunedIds = state.preferidas.filter(item => {
                if(item.id === action.payload.id){
                    theitem = item;
                }
                return item.id === action.payload.id // return all the items matching the action.id
            })

            if (prunedIds.length === 0) {
                return {
                    ...state,
                    //lolo
                    preferidas: [...state.preferidas,
                    {
                        'id': action.payload.id,
                        'title': action.payload.title,
                        'sinopsis': action.payload.sinopsis,
                        'lanzamiento': action.payload.lanzamiento,
                        'valoracion': action.payload.valoracion,
                        'cantidad': 1
                    }]
                }
            }

            //update
            const newcant = theitem.cantidad + 1;
            const index = state.preferidas.indexOf(theitem);
            const newpreferidas = state.preferidas.slice(0, index)
                .concat([{
                    'id': action.payload.id,
                    'title': action.payload.title,
                    'sinopsis': action.payload.sinopsis,
                    'lanzamiento': action.payload.lanzamiento,
                    'valoracion': action.payload.valoracion,
                    'cantidad': newcant,    
                }]).concat(state.preferidas.slice(index + 1));

            return Object.assign({}, state, {
                preferidas: newpreferidas
            });
        }

        case 'QUIT_PELICULA': {
            let theitem = {};
            state.preferidas.filter(item => {
                if(item.id === action.payload.id){
                    theitem = item;
                }
                return item.id === action.payload.id // return all the items matching the action.id
            })

            const index = state.preferidas.indexOf(theitem);
            const newpreferidas = state.preferidas.slice(0, index)
            .concat(state.preferidas.slice(index + 1));

            return Object.assign({}, state, {
                preferidas: newpreferidas
            });
        }
        case 'PASS_HASHPELICULA': {
            if(state.byId.indexOf(action.payload.id)>-1){
                let newvalue =  state.hashpreferidas[action.payload.id];
                newvalue.cantidad = newvalue.cantidad + 1;
                
                state.hashpreferidas[action.payload.id] = {
                    ...state.hashpreferidas[action.payload.id],
                    ...newvalue
                  }
                  return {
                      ...state
                  }
            }    

            let newvalue =  action.payload;
            newvalue.cantidad = 1;

            return Object.assign({}, state, {
                hashpreferidas: {
                    ...state.hashpreferidas,
                    [action.payload.id]: newvalue
                  },
                  byId: [ ...state.byId, action.payload.id]
            });
        }

        case 'UPDATE_HASHPELICULA': {
            state.byHash[action.payload.id] = {
              ...state.byHash[action.payload.id],
              ...action.payload
            }
            return {
                ...state
            }
        }

        case 'QUIT_HASHPELICULA': {
            const prunedIds = state.byId.filter(item => {
                return item !== action.payload.id // return all the items not matching the action.id
            })
            delete state.hashpreferidas[action.payload.id] // delete the hash associated with the action.id
            return Object.assign({}, state, {
                hashpreferidas: state.hashpreferidas,
                byId: prunedIds
            });
        }
        default: return state
    }

    
    
}