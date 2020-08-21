import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PerfilResto from './P_Resto'
import PerfilUsuario from './P_User'
import {Link} from 'react-router-dom'

const Profile = (props) => {
    const RestoProductos = props.profile.isResto ?
        <PerfilResto />
        :
        <PerfilUsuario />

    let settings;

    if (!props.auth.uid && props.auth.isLoaded) {
        return <Redirect to="/login" />
    }
    else {
        if (props.profile.isLoaded && props.auth.isLoaded) {
            // CANCELAR EL HECHO DE BORRAR LA CUENTA CON LA CUENTA DE USUARIO PREDETERMINADO
            settings = props.auth.uid === "iSOcYsCUziVYHIqspg0bfeNlCox2" ?
             null :
             <Link to="/settings">Configuracion</Link>
            
            return (
                <div className="container nav-center">
                    <div className="carta">
                        <h1 title={props.profile.nombre + " " + props.profile.apellido}>{props.profile.nombre} {props.profile.apellido}</h1>
                        <p className="titulo">{props.auth.email}</p>
                        {settings}
                        <br />
                    </div>
                    <div>

                        {props.profile.isLoaded && RestoProductos}
                    </div>
                </div>


            )
        } else {
            return (
                <div className="caja">
                    <div className="centrado">
                        <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                            <div></div><div></div><div></div><div></div>
                        </div></div>
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
export default connect(mapStateToProps)(Profile)