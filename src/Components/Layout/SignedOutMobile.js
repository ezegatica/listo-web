import React from 'react'
import {NavLink} from 'react-router-dom'

function SignedOutMobileNavbar() {
    return (
        <div>
            <br/>
            <nav className="show-on-medium-and-down hide-on-med-and-up">
        <div className="nav-wrapper grey darken-2 awdajkhbdw">
            <ul className="center">
                <li><NavLink to="/proyectos">Proyectos</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Registrarse</NavLink></li>
            </ul>
            <br/>
            <br/>
        </div>
    </nav>
    

    </div>
        
    )
}

export default SignedOutMobileNavbar
