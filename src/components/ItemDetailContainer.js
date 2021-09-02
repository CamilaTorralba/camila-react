import React, {useState, useEffect} from 'react'
import ItemDetail from './ItemDetail'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../firebase';

const obtenerItemDetail = (id) => {
    const db = getFirestore();
    return new Promise((res,rej) => {
        const itemCollection = db.collection("items");
        let buscarItem = itemCollection.doc(id);
        buscarItem.get().then((doc) => {
            if(!doc.exists) {
                rej('El item no existe');
                return;
            }
            res({ id: doc.id, ...doc.data() });
        }).catch((error) => {
            rej('Ocurrio un error, intenta más tarde', error);
        });
    })
}

const ItemDetailContainer = () => {
    
    
    const { id } = useParams();
    const [ itemsDetalles, setItemsDetalles ] = useState([]); 
       
    useEffect(() => {        
        
        obtenerItemDetail(id).then(res => {
           
            setItemsDetalles(res);
        });    
    }, [id]);

    return (        
        <>
            
        <ItemDetail itemsDetalle={itemsDetalles} />
            
            
        </>
    )
}

export default ItemDetailContainer
