import React, {useEffect, useState} from 'react';
import ItemList from './ItemList';
import { getFirestore } from '../firebase';
import { useParams } from 'react-router-dom'

const ItemListContainer = ({title}) => {

    const [items, setItems] = useState([]);
    const { categoryId } = useParams();

    useEffect( () => {
        const db = getFirestore();
        let itemCollection = db.collection("items");
        
        if(categoryId) {
            itemCollection = itemCollection.where('categoryId', '==', categoryId)
        }

        itemCollection.get().then((querySnapshot) => {
            if(querySnapshot.size === 0){
                console.log('No results');
            };
            setItems(
                querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            );
        });    

    }, [categoryId]);  
    
    return (
        <>
            {
                title 
                ?
                <div className="text-center p-5">
                    <h2 className="text-center titulo-principal">{title}</h2>
                </div>
                :
                null
            }
            <ItemList item={items} /> 
        </>
    )
}

export default ItemListContainer
