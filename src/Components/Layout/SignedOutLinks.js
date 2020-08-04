import React from 'react'
import {NavLink } from 'react-router-dom'

const SignedOutLinks= () => {
    return(
        <div className="hide-on-med-and-down">
            <li><NavLink to="/register">Registrarse</NavLink></li>
            <li><NavLink to="/login">Entrar</NavLink></li>
            <li><NavLink to="/proyectos">Lista de Proyectos</NavLink></li>
        </div>
            
    )
}

export default SignedOutLinks