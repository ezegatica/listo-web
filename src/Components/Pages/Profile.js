import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PerfilResto from './P_Resto'
import PerfilUsuario from './P_User'
import { Link } from 'react-router-dom'

const Profile = (props) => {
    const RestoProductos = props.profile.isResto ?
        <PerfilResto />
        :
        <PerfilUsuario />

    let settings;
    let visorCategorias;
    let AvisoCategorias;
    if (!props.auth.uid && props.auth.isLoaded) {
        return <Redirect to="/login" />
    }
    else {
        if (props.profile.isLoaded && props.auth.isLoaded) {
            // CANCELAR EL HECHO DE BORRAR LA CUENTA CON LA CUENTA DE USUARIO PREDETERMINADO
            settings = props.auth.uid === "iSOcYsCUziVYHIqspg0bfeNlCox2" ?
                null :
                <Link to="/settings">Configuracion</Link>
            AvisoCategorias = props.profile.cat === "" && props.profile.cat2 === "" ? <Link to="/settings"><div className="aviso-container"><span className="aviso">AVISO: </span><span className="categorias"><span className="categorias">No tienes categorias asignadas a tu restaurante! Considera agregando al menos una para poder alcanzar mas gente! <br /> Haz click <blue>en este texto</blue> y navega hasta "Categorias" y selecciona una para seguir.</span></span></div></Link>
                : null
            visorCategorias = props.profile.isResto && !AvisoCategorias ? <div> <span className="titulo">Categorias: </span><span className="categorias">{props.profile.cat && props.profile.cat}{props.profile.cat2 && " y " + props.profile.cat2}</span></div> : null

            return (
                <div className="container nav-center">
                    <div className="carta">
                        <h1 title={props.profile.nombre + " " + props.profile.apellido}>{props.profile.nombre} {props.profile.apellido}</h1>
                        <p className="titulo">{props.auth.email}</p>
                        {visorCategorias}
                        {AvisoCategorias}
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