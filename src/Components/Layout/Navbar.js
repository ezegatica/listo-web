import React from 'react'
import { Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import SignedOutMobile from './SignedOutMobile'
import SignedInMobile from './SignedInMobile'
import {connect} from 'react-redux'


const Navbar= (props) => {
    const {auth, profile} = props;
    const links = auth.uid && profile.isLoaded ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>
    const mobile = auth.uid ? <SignedInMobile profile={profile}/> : <SignedOutMobile/>

    return(
        <nav className="nav-wrapper" style={{background: '#004ea3'}}>
            <div className="container">
                <Link to="/" className="brand-logo">Listo!</Link>
                
                <ul className="right">
                {auth.isLoaded && profile.isLoaded && links}
                </ul>
                <ul className="left show-on-medium-and-down hide-on-med-and-up" >
                    <SignedInLinks showCarritoOnly={true} profile={profile}/>
                </ul>
                
            </div>
            <ul className="show-on-medium-and-down hide-on-med-and-up">
                {auth.isLoaded && profile.isLoaded && mobile}
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