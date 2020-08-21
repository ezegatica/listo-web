import React from 'react'
import {NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../Actions/authActions'
const SignedInLinks= (props) => {

    return(
        <div className="nav-wrapper grey darken-3">
            <ul className="right">
                <li className="link-disabled" title="deshabilitado temporalmente">Nuevo producto</li>
                <li><NavLink to="/restaurantes">Restaurantes</NavLink></li>
                <li><NavLink to="/admin">ADMIN</NavLink></li>
                <li><a href="#logout" onClick={props.signOut}>Logout</a></li>
                <li><NavLink to="/profile" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
            </ul>

            {/* <ul className="show-on-medium-and-down hide-on-med-and-up right" >
                <li><a href="/#logoutMobile" style={{padding:0, margin:0}} onClick={props.signOut}><i className="material-icons left white-text">logout</i></a></li>
                <li><Link to="/profile" className="btn btn-floating red lighten-1" style={{padding:0, margin:0}}>{props.profile.initials}</Link></li>
            </ul> */}
           

        
        </div>  

        
        
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () =>dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)



