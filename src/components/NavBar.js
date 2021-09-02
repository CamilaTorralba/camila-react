import React from 'react'
import CartWidget from './CartWidget'
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../context/cartContext';

const NavBar = () => {
    const { sumarItems } = useCartContext();   

    const implementarCategorias = [
        {id: 'remeras', name: 'Remeras'},
        {id: 'buzos', name: 'Buzos'},
        {id: 'pantalones', name: 'Pantalones'},
        {id: 'accesorios', name: 'Accesorios'}
    ];


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
             <img className="m-1" alt="Logo STK" src="https://nervous-feynman-31ade6.netlify.app/img/Logo%20SKT.png"/> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Inicio</NavLink>
                        </li>
                        {implementarCategorias.map(cat => 
                            <li key={cat.id} className="nav-item">
                                <NavLink className="nav-link" to={`/categoria-${cat.id}`}>{cat.name}</NavLink>
                            </li>
                        )}
                    </ul> 
                    <CartWidget />                 
                    {sumarItems()}
                
                </div>
            </nav>
        </div>
    )
}

export default NavBar
