import React from 'react'
import {NavLink} from 'react-router-dom'

function SignedInMobileNavbar() {
    return (
        <div>
            <br/>
            <nav className="show-on-medium-and-down hide-on-med-and-up">
        <div className="nav-wrapper grey darken-2 awdajkhbdw">
            <ul className="center">
                <li><NavLink to="/proyectos">Proyectos</NavLink></li>
                {/* <li><NavLink to="/dashboard">Dashboard</NavLink></li> */}
                <li><NavLink to="/proyectos/nuevo">Nuevo proyecto</NavLink></li>
            </ul>
        </div>
        <br/>
            <br/>
    </nav>

        </div>
        
    )
}

export default SignedInMobileNavbar
