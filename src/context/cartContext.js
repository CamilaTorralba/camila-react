import React, { useContext, useState } from 'react'
export const CartContext = React.createContext();
export const useCartContext = () => useContext(CartContext);

export default function CartProvider({ children, defaultCart = [] }) {

    const [cart, setCart] = useState(defaultCart);
    let nuevoCart;

   
    function add(item) {    
        if(!cart.find(p => p.id === item.id) && item.quantity !== 0 ){
            setCart([...cart, item]);

            console.log('Agregaste:', item);     
        } else {
            console.log('Duplicado o nulo:', item);
            nuevoCart = [...cart];

            const filtrarId = nuevoCart.findIndex(buscarIndex => buscarIndex.id === item.id);

            if(filtrarId !== -1){                    
                nuevoCart[filtrarId].quantity = nuevoCart[filtrarId].quantity + item.quantity;
                setCart(nuevoCart); 
            }
           
        }       
    }
   
    function remove(itemId) {
        
        
        setCart(cart.filter(item => item.id !== itemId));
    }

    function clear() {
        setCart([]);
    }
    function sumarItems() {
        // Sumar cantidad
        let sumarItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        return (
            <span className="items-en-carrito">
                {sumarItems}
            </span>
        );
    }
    sumarItems()

    function sumarTotal() {
        // Sumar cantidad
        let sumarTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        return (sumarTotal);
    }
    sumarTotal()

    return <CartContext.Provider 
    value={{ 
        cart, 
        add, 
        remove, 
        clear,
        sumarItems,
        sumarTotal,
        isEmpty: cart.length === 0
    }}>
        { children }
    </CartContext.Provider>

}