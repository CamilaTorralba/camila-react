import React from 'react'
import Item from './Item';

const ItemList = ({item}) => {
    return (
        
        <div className="container">        
            <div className="row">
                {item.map(item => (                     
                    <Item key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default ItemList