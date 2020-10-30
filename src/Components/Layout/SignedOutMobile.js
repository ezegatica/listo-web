import React from 'react'
import { NavLink } from 'react-router-dom'

function SignedOutMobile() {
    return (
        <div>
            <br />
            <nav className="show-on-medium-and-down hide-on-med-and-up color-nav-mobile">
                <div className="nav-wrapper">
                    <ul className="center">
                        <li><NavLink to="/restaurantes">Restaurantes</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Registrarse</NavLink></li>
                    </ul>
                    <br />
                    <br />
                </div>
            </nav>


        </div>

    )
}

export default SignedOutMobile
