import React from 'react'
import { Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'

const Navbar= (props) => {
    const {auth} = props;
    console.log(auth)
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>
    return(
        <nav className="nav-wrapper grey darken-3">
            <ul className="left">
                    <li><a href="https://react.gati.ga">Otros proyectos</a></li>
                </ul>
            <div className="container">
                
                <Link to="/" className="brand-logo">GatiPlanner</Link>
                <ul className="right">
                {auth.isLoaded && links}
                </ul>
                

            </div>
        </nav>
    )
}

const mapStateToProps= (state) =>{
    return{
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(Navbar)