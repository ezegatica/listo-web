import React from 'react'
import { NavLink } from 'react-router-dom'

function SignedInMobile(props) {
    const panelAdmin = props.profile.isAdmin ? 
    <li><NavLink to="/admin">Admin</NavLink></li> : null
    const panelResto = props.profile.isResto ?
    <li><NavLink to="/productos/nuevo">Nuevo producto</NavLink></li> : null

    return (
        <div>
            <br />
            <nav className="show-on-medium-and-down hide-on-med-and-up">
            <div className="nav-wrapper grey darken-2 ">
                <ul className="center">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/restaurantes">Restaurantes</NavLink></li>
                    {panelAdmin}
                    {panelResto}
                </ul>
                </div>
            </nav>
        </div>
    )
}

export default SignedInMobile
