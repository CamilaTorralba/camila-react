import React from 'react'
import { Link } from 'react-router-dom';

const Item = ({ item }) => {

    return (
        <>
            <div className="col-sm-4 align-self-center vista-productos">            
                <Link to={`/item/${item.id}`}>                    
                    <img className="imagen-producto-list" alt={item.title} src={`./images/${item.imageId}`} />
                </Link>
                <h2 className="titulo-producto">{item.title}</h2>
                <p className="description-producto-cat"><strong>SKU:</strong> {item.id}</p>
                <p className="description-producto-cat"><strong>Categoria:</strong> {item.categoryId}</p>
                <p className="description-producto-cat"><strong>Precio:</strong> $ {item.price}</p>
                <p>{item.pictureUrl}</p>

                <Link 
                to={`/item/${item.id}`}
                className="col-md-12 btn btn-detalle"
                > 
                Ver detalle
                </Link>
            </div>
        </>
    )
}

export default Item
