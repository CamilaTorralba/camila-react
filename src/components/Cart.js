import React, { useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCartContext } from '../context/cartContext';
import { NavLink } from 'react-router-dom';
import { getFirestore } from '../firebase';

const Cart = () => {

    const { cart, remove, clear, isEmpty, sumarTotal } = useCartContext();  
    
    const [nombreBuyer, setNombreBuyer] = useState('');    
    const [phoneBuyer, setPhoneBuyer] = useState('');    
    const [emailBuyer, setEmailBuyer] = useState('');  
    const [confirmarEmailBuyer, setConfirmarEmailBuyer] = useState('');  
    const [ordenConfirmada, setOrdenConfirmada] = useState();
    const [finalizarCompra, setFinalizarCompra] = useState(false);
    const [ordenGracias, setOrdenGracias] = useState(false);
    
    async function createOrder() {      
            const newOrder = {
                buyer: { name: nombreBuyer, phone: phoneBuyer, email: emailBuyer },
                
                items: cart.map(c => (
                    {id: c.id, title: c.item, price: c.price, quantity: c.quantity}                
                ),),
                date: firebase.firestore.FieldValue.serverTimestamp(),
                total: sumarTotal(),
            };
            const db = getFirestore();
            const orders = db.collection("orders");
            try {
                const doc = await orders.add(newOrder);
                setOrdenConfirmada(doc.id);
                setOrdenGracias(true);
                
                // Update stock
                const itemQueryByManyId = await db.collection("items")
                    .where(firebase.firestore.FieldPath.documentId(), 'in', cart.map(c => c.id) );

                const query = await itemQueryByManyId.get();
                const batch = db.batch();                
                const outOfStock = [];                
                query.docs.forEach((item, id) => {
                    if(item.data().stock >= cart[id].quantity){
                        batch.update(item.ref, {stock: item.data().stock - cart[id].quantity });
                    }else {
                        outOfStock.push({ ...item.data(), id: item.id });
                    }
                })

                if( outOfStock.length === 0 ) {
                    await batch.commit();
                }
                
                clear();
            } catch (err) {
                console.log('Error creating order', err);
            }
    }

    
    return (
        <> 
         {
            ordenGracias === false
         ?
         <div className="container">
         {isEmpty ? 
         <div className="items-agregados text-center p-5">
                <p className="p-4"><strong>El carrito esta vacio</strong></p>
                <NavLink className="botonCarrito p-2" to="/">Ver productos</NavLink>
            </div>
            : 
            <ul className="container-fluid">   
            <span className="row items-agregados mi-carrito">Mi carrito</span>
            {cart.map(p => (                
                <li className="row items-agregados" key={p.id}>
                    <div className="col-md-2 align-self-center">
                        <img className="imagen-producto-carrito" alt={p.item} src={`./images/${p.image}`} />
                    </div>
                    <div className="col-md-8 align-self-center">
                        <p className="titulos-items-agregados">{p.item}</p>
                        <p className="titulos-items-agregados"><strong>SKU: </strong>{p.id}</p>
                        <hr/>
                        <div className="row">
                            <div className="col-md-4">
                                <span className="titulos-items-agregados"><strong>Precio por unidad: </strong>$ {p.price}</span>
                            </div>
                            <div className="col-md-4">
                                <span className="titulos-items-agregados"><strong>Cantidad agregada: </strong>{p.quantity}</span>
                            </div>
                            <div className="col-md-4">
                                <span className="titulos-items-agregados"><strong>Precio total: </strong>$ {p.price * p.quantity}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 align-self-center text-center">
                        <button
                            className="btn-remove"
                            onClick={() => {
                                remove(p.id);
                            }}
                            >
                            Remove
                        </button>
                    </div>                        
                </li>
            ))}

            <span className="row items-agregados total-a-pagar">Total a pagar: ${ sumarTotal() }</span>
                
            <button className="btn-vaciar-carrito m-2" disabled={isEmpty} onClick={() => { clear() } } >Vaciar todo el carrito</button>
                {
                    finalizarCompra === false
                    ?
                    <button className="btn-crear-orden m-2" disabled={isEmpty} onClick={() => { setFinalizarCompra(true) } }>Finalizar compra</button>
                    :

                    <div className="container row items-agregados p-3 mt-5">
                        <p className="titulo-producto text-center p-2">Ingresa tus datos para finalizar tu compra.</p>
                        <input 
                            className="col-md-6 form-control mb-2" 
                            type="text" 
                            placeholder="Nombre y Apellido"
                            value={nombreBuyer}
                            onChange={evt => {
                                setNombreBuyer(evt.target.value);
                            }}
                        />
                        <input 
                            className="col-md-6 form-control mb-2" 
                            type="text" 
                            placeholder="Teléfono"
                            value={phoneBuyer}
                            onChange={evt => {
                                setPhoneBuyer(evt.target.value);
                            }}
                        />
                                              
                        <input 
                            className="col-md-6 form-control mb-2" 
                            type="text" 
                            placeholder="Email"
                            value={emailBuyer}
                            onChange={evt => {
                                setEmailBuyer(evt.target.value);
                            }}
                        />           
                        <input 
                            className="col-md-6 form-control mb-2" 
                            type="text" 
                            placeholder="Confirmar email"
                            value={confirmarEmailBuyer}
                            onChange={evt => {
                                setConfirmarEmailBuyer(evt.target.value);
                            }}
                        />    
      
                        <button 
                            className="btn btn-crear-orden col-md-12" 
                            disabled={isEmpty || !nombreBuyer || !phoneBuyer || !emailBuyer || emailBuyer !== confirmarEmailBuyer} 
                            onClick={createOrder} 
                        >
                            Crear orden
                        </button>

                    </div>
                }
            </ul>
        } 
        </div>
        :
        <div className="container items-agregados p-5 mt-5">
            <div className="alert compra-finalizada">
                <p><strong>Estado:</strong> Su orden ha sido confirmada y está siendo procesada.</p>
                <h3><strong>Orden n°: {ordenConfirmada}</strong></h3>
                <hr/>
                <ul>
                    <li><strong>Nombre y apellido: </strong>{nombreBuyer}</li>
                    <li><strong>Teléfono: </strong>{phoneBuyer}</li>
                    <li><strong>Email: </strong>{emailBuyer}</li>
                </ul>
            </div>
        </div>  
        }
        
        </>
    )
}

export default Cart
