import clienteAxios from '../config/clienteAxios';

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,

    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO

} from '../types';

import Swal from 'sweetalert2'


//-------------CREA LOS PRODUCTOS------------------
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto)
            //si todo sale bien cambiar el state
            dispatch(agregarProductoExito(producto));
            //alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true));
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Tenemos un error'

            });
        }
    }
}
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})
//si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
//si hay error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//--------------DESCARGA DE BD---------------

export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            //test de carga
            // setTimeout(async() => {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargarProductosExitosa(respuesta.data));
            //}, 2000);

        } catch (error) {
            dispatch(descargaProductosError())

        }
    }
}
const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});
const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//------SELECCIONA Y ELIMINA PRODUCTO-----------
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            //SI se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'Tu producto fue eliminado',
                'success'
            )

        } catch (error) {
            dispatch(eliminarProductoError());
        }


    }
}
export const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
export const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
});
export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//--------COLOCAR PRODUCTO EN EDICION-----------
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoAction(producto));
    }
}
export const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//editar un registro en api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto());
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto))

        } catch (error) {
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});
const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})
const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})
