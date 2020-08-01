import React from 'react'
import {NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../Actions/authActions'

const SignedInLinks= (props) => {
    return(
        <div>
            <li><NavLink to="/proyectos/nuevo">Nuevo proyecto</NavLink></li>
            <li><NavLink to="/dashboard">Panel de Control</NavLink></li>
            <li><NavLink to="/proyectos">Lista de Proyectos</NavLink></li>
            <li><a href="#logout" onClick={props.signOut}>Logout</a></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
        </div>
            
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () =>dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)