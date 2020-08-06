import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Mios from '../Proyects/Mine'
import Products from '../Proyects/ProductosList'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Profile = (props) => {
    const { projects } = props
    console.log("PROPS:", props)
    const admin = props.profile.isAdmin ? <div>Hola admin!</div> : null

    if (!props.auth.uid && props.auth.isLoaded) {
        return <Redirect to="/login" />
    }
    else {
        if (props.profile.isLoaded) {
            console.log("ES ADMIN?", props.profile.isAdmin)
            return (
                <div className="container nav-center">
                    <div className="carta">
                        <h1>{props.profile.nombre} {props.profile.apellido}</h1>
                        <p className="titulo">{props.auth.email}</p>
                        <div>{admin}</div>
                    </div>
                    <div>
                        <h4 className="center">Mis proyectos:</h4>
                        <Mios projects={projects} auth={props.auth} />
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
        profile: state.firebase.profile,
        projects: state.firestore.ordered.proyectos,
        firestoreall: state.firestore,
        firebasall: state.firebase
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'proyectos' },
        { collection: 'usuarios' },
    ])
)(Profile)