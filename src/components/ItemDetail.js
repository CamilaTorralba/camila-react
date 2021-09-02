import React from 'react'
import Detail from './Detail'

const ItemDetail = ({ itemsDetalle }) => {
    return (
        <div className="container">
            <Detail key={itemsDetalle.id} itemsDetalle={itemsDetalle} />
            
        </div>
    )
}

export default ItemDetail
