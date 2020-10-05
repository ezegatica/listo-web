import React from 'react'
import {NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../Actions/authActions'
import {Link} from 'react-router-dom'
const SignedInLinks= (props) => {
    const panelAdmin = props.profile.isAdmin ? 
    <li><NavLink to="/admin">Admin</NavLink></li> : null
    const panelResto = props.profile.isResto ?
    <li><NavLink to="/productos/nuevo">Nuevo producto</NavLink></li> : null
    let carrito;
    if (props.profile.cart){
        if (props.profile.cart.length > 0){
            carrito =  <li><NavLink to="/carrito">Carrito ({props.profile.cart.length})</NavLink></li>
        }else{
            carrito = null
        }
    }else{
        carrito = null
    }

    return(
        <div className="nav-wrapper grey darken-3">
            <ul className="right hide-on-med-and-down">
                {panelResto}
                {panelAdmin}
                <li><NavLink to="/restaurantes">Restaurantes</NavLink></li>
                <li><NavLink to="/" onClick={props.signOut}>Logout</NavLink></li>
                {carrito}
                <li><NavLink to="/profile" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
            </ul>
            <ul className="show-on-medium-and-down hide-on-med-and-up right">
                <li><NavLink to="/" style={{padding:0, margin:0}} onClick={props.signOut}><i className="material-icons left white-text">logout</i></NavLink></li>
                <li><Link to="/profile" className="btn btn-floating red lighten-1" style={{padding:0, margin:0}}>{props.profile.initials}</Link></li>
            </ul>
        </div>          
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () =>dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)



