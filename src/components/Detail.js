import React, { useState } from 'react'
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cartContext';

const Detail = ({ itemsDetalle }) => {   

    const [ agregadoAlCarrito, setAgregadoAlCarrito ] = useState(0);  
    const { add } = useCartContext();

    
    function onAdd(cantidadAdd){
        setAgregadoAlCarrito(cantidadAdd);
        console.log('Se agregaron', cantidadAdd);
        console.log('El item agregado es id:', itemsDetalle.id );
        
        add({
           item: itemsDetalle.title,
           quantity: cantidadAdd,
           id: itemsDetalle.id,
           price: itemsDetalle.price,
           image: itemsDetalle.imageId
        });

    }

    return (
        <>
            <div className="row vista-productos p-3">
                <div className="col-md-5 p-3 align-self-center">
                <img className="imagen-producto-detail" alt={itemsDetalle.imageId} src={`../images/${itemsDetalle.imageId}`} />                 
                </div>
                <div className="col-md-7 p-2 align-self-center">
                <h2 className="titulo-producto">{itemsDetalle.title}</h2>  
                    <p className="description-producto-cat">{itemsDetalle.description}</p>
                    <p className="description-producto-cat"><strong>SKU:</strong> {itemsDetalle.id}</p>
                    <p className="description-producto-cat"><strong>Categoria:</strong> {itemsDetalle.categoryId}</p>
                    <p className="description-producto-cat">Stock disponible: <strong>{itemsDetalle.stock}</strong></p>
                    <p className="description-producto-cat"><strong>Precio:</strong> ${itemsDetalle.price}</p>   
                {
                    agregadoAlCarrito === 0
                    ?
                    <ItemCount   
                    stock={itemsDetalle.stock} 
                    initial={0} 
                    onAdd={onAdd} 
                />
                    :

                        <Link 
                        to="/cart"
                        className="col-md-12 btn btn-danger"
                        >
                        Terminar mi compra
                        </Link>
                }
                </div>                
            </div>                 
        </>
    )
}

export default Detail
