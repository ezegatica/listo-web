import React from 'react'
import { NavLink } from 'react-router-dom'

function SignedInMobile(props) {
    const panelAdmin = props.profile.isAdmin ?
    <li><NavLink to="/admin"><i className="material-icons">admin_panel_settings</i></NavLink></li> : null
    const panelResto = props.profile.isResto ?
        <li><NavLink to="/productos/nuevo">Nuevo producto</NavLink></li> : null
    // let carrito;
    // if (props.profile.cart) {
    //     if (props.profile.cart.length > 0) {
    //         carrito = <li><NavLink to="/carrito"><span><i className="material-icons">shopping_cart<span class="badge white-text" style={{padding:0, margin: 0}}>({props.profile.cart.length})</span></i></span></NavLink></li>
    //     } else {
    //         carrito = null
    //     }
    // } else {
    //     carrito = null
    // }
    return (
        <div>
            <br />
            <nav className="show-on-medium-and-down hide-on-med-and-up">
                <div className="nav-wrapper color-nav-mobile"  >
                    <ul className="center">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/restaurantes">Restaurantes</NavLink></li>
                        <li><NavLink to="/pedidos">Pedidos</NavLink></li>
                        {panelAdmin}
                        {/* {carrito} */}
                        {panelResto}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default SignedInMobile
