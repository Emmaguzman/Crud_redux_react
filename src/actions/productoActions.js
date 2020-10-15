import clienteAxios from '../config/clienteAxios';

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
} from '../types';

//Crear nuevos productos

export function crearNuevoProductoAction(producto){
    return async(dispatch)=>{
        dispatch(agregarProducto());

        try {
            //insertar en la API
            await clienteAxios.post('/productos',producto)
            //si todo sale bien cambiar el state
            dispatch(agregarProductoExito(producto));
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true));
        }
    }
}
const agregarProducto=()=>({
    type:AGREGAR_PRODUCTO,
    payload:true
})

//si el producto se guarda en la base de datos
const agregarProductoExito=producto=>({
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto
})
//si hay error
const agregarProductoError=estado=>({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:estado
})


