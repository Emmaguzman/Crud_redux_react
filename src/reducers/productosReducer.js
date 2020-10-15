import {
AGREGAR_PRODUCTO,
AGREGAR_PRODUCTO_EXITO,
AGREGAR_PRODUCTO_ERROR
}
from '../types'
//cada reducer tiene su propio state
const inicialState={
    productos:[],
    error:false,
    loading:false
}

//reducer siempre es una funcion

export default function (state=inicialState,action){
    switch (action.type) {
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading:action.payload
            }
         case AGREGAR_PRODUCTO_EXITO:
             return{
                 ...state,
                 loading:false,
                 productos:[...state.productos,action.payload]
             }
          case AGREGAR_PRODUCTO_ERROR:
              return{
                  ...state,
                  loading:false,
                  error:action.payload
              }      
        default:
            return state;
    }
}