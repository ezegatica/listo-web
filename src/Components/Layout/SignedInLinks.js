import React from 'react'
import {NavLink } from 'react-router-dom'

const SignedInLinks= () => {
    return(
        <ul className="right">
            <li><NavLink to="/proyectos/nuevo">Nuevo proyecto</NavLink></li>
            <li><NavLink to="/dashboard">Panel de Control</NavLink></li>
            <li><NavLink to="/">Logout</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">EG</NavLink></li>
        </ul>
    )
}

export default SignedInLinks