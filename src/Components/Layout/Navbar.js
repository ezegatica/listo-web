import React from 'react'
import { Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import {connect} from 'react-redux'
import SignedInMobileNavbar from './SignedInMobile'
import SignedOutMobileNavbar from './SignedOutMobile'

const Navbar= (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>
    const mobile = auth.uid ? <SignedInMobileNavbar/> : <SignedOutMobileNavbar/>
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">GatiPlanner</Link>
                
                <ul className="right">
                {auth.isLoaded && links}
                </ul>
                <ul className="show-on-medium-and-down hide-on-med-and-up">
                {auth.isLoaded && mobile}
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps= (state) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(Navbar)