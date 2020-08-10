import React from 'react'
import {NavLink } from 'react-router-dom'

const SignedOutLinks= () => {
    return(
        <div>
            <li><NavLink to="/register">Registrarse</NavLink></li>
            <li><NavLink to="/login">Entrar</NavLink></li>
            <li><NavLink to="/restaurantes">Restaurantes</NavLink></li>
        </div>
            
    )
}

export default SignedOutLinks