import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Products from '../Productos/Lista'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Profile = (props) => {
    // console.log("PROFILE.JS PROPS:", props)
    const admin = props.profile.isAdmin ? <div>Hola admin!</div> : null
    if (!props.auth.uid && props.auth.isLoaded) {
        return <Redirect to="/login" />
    }
    else {
        if (props.profile.isLoaded) {
                // console.log("ES ADMIN?", props.profile.isAdmin)
            return (
                <div className="container nav-center">
                    <div className="carta">
                        <h1>{props.profile.nombre}</h1>
                        <p className="titulo">{props.auth.email}</p>
                        <div>{admin}</div>
                    </div>
                    <div>
                        <h4 className="center">Mis productos:</h4>
                        <Products/>
                    </div>
                </div>


            )
        } else {
            return (
                <div className="caja">
                    <div className="centrado">
                        <p>Cargando...</p>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'proyectos' },
        { collection: 'usuarios' },
    ])
)(Profile)