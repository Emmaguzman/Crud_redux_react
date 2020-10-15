import React,{ useState,useEffect } from 'react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editarProductoAction } from '../actions/productoActions';




export const EditarProducto = () => {
    const history=useHistory();
    const dispatch = useDispatch();
    //nuevo state de producto
    const [producto, setProducto] = useState({
        nombre:'',
        precio:''
    });
    //producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);
    

    //llenar el state

    useEffect(() => {
       setProducto(productoeditar);
    }, [productoeditar]);

    //leer los datos del formulario

    const _onChangeFormulario=e=>{
        setProducto({
            ...producto,
            [e.target.name]:e.target.value
        })
    }

    const {nombre,precio}=producto;
    
    const _submitEditarProducto=e=>{
        e.preventDefault();

       dispatch( editarProductoAction(producto));
       history.push('/');
    }
    return (
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">
                       Editar Producto
                    </h2>
                    <form onSubmit={_submitEditarProducto}>
                        <div className="form-group">
                            <label htmlFor="">Nombre Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="nombre" 
                                value={nombre}
                                onChange={_onChangeFormulario}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Precio Producto</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Precio Producto"
                                name="precio"
                                value={precio} 
                                onChange={_onChangeFormulario}
                                />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary
                                      font-weight-bold 
                                      text-uppercase 
                                      d-block 
                                      w-100"
                        >
                           Guardar cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditarProducto ;