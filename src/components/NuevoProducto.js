import React from 'react';
import react, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
//actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = () => {

    //state del componente 
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    //utilizar usedispath y crea una funcion
    const dispatch=useDispatch();

    //manda a llamar el action de producto action
    const agregarProducto=producto=>dispatch(crearNuevoProductoAction(producto))

    const _submitNuevoProducto=e=>{
        e.preventDefault();
        //validar formulario
        if(nombre.trim()==='' || precio <=0){
            return;
        }
        //si no hay errores


        //crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        <form 
                            onSubmit={_submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    vale={nombre}
                                    onChange={e=>setNombre(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e=>setPrecio(Number(e.target.value))} />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary
                                          font-weight-bold 
                                          text-uppercase 
                                          d-block 
                                          w-100"
                            >
                                Agregar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NuevoProducto;
