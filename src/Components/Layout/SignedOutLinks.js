import React from 'react'
import {NavLink } from 'react-router-dom'

const SignedOutLinks= () => {
    return(
        <ul className="right">
            <li><NavLink to="/register">Registrarse</NavLink></li>
            <li><NavLink to="/login">Entrar</NavLink></li>
            <li><NavLink to="/proyectos">Lista de Proyectos</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks