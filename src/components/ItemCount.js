import React, { useState } from 'react'

const ItemCount = ({stock, initial, onAdd}) => {
    
    const [cantidadItem, setCantidadItem] = useState(initial);

        function addCantidad() { 
            if(cantidadItem < stock) {
                setCantidadItem(cantidadItem + 1); 
            } else {
                console.log('no más items disponibles');
            }
        }
        function removeCantidad() { 
            if(cantidadItem >= 1 ) {
                setCantidadItem(cantidadItem - 1); 
            }
        }
             
        return (
            <div className="item-count-carrito">
                <div className="col-md-12 d-flex mt-1 align-items-center">
                        <button type="button" onClick={removeCantidad} className="btn btn-secondary btn-sm btn-form-input">-</button>
                        <div className="form-control form-input-number">{cantidadItem}</div>
                        <button type="button" onClick={addCantidad} className="btn btn-secondary btn-sm btn-form-input">+</button>
                </div>
                <button 
                    onClick = { ( ) => {
                        onAdd(cantidadItem);
                    }}
                    disabled={ stock <= 1 ? true : false } 
                    className="col-md-12 btn btn-danger"
                    type="button" 
                >
                    Agregar
                </button>           
            </div>
        );
}

export default ItemCount
