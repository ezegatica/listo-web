import React from 'react'
import { Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import SignedOutMobile from './SignedOutMobile'
import SignedInMobile from './SignedInMobile'
import {connect} from 'react-redux'


const Navbar= (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>
    const mobile = auth.uid ? <SignedInMobile profile={profile}/> : <SignedOutMobile/>

    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Listo!</Link>
                
                <ul className="right">
                {auth.isLoaded && links}
                </ul>
                
            </div>
            <ul className="show-on-medium-and-down hide-on-med-and-up">
                {auth.isLoaded && mobile}
                </ul>
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