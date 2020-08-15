import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Lista from '../Productos/Lista'
import { auth } from '../../Config/fbConfig'


const sendMail = (credentials) => {
    console.log("verificar", credentials)
    auth.currentUser.sendEmailVerification()
    .then(() => {
        console.log("MAIL ENVIADO!")
    }).catch((err)=>{
        console.log("ERROR: ", err.message)
    })
}
const Profile = (props) => {
    const admin = props.profile.isAdmin ? <div>Admin Mode Owo</div> : null
    if (!props.auth.uid && props.auth.isLoaded) {
        return <Redirect to="/login" />
    }
    else {
        if (props.profile.isLoaded) {
            return (
                <div className="container nav-center">
                    <div className="carta">
                        <h1 title={props.profile.nombre}>{props.profile.nombre}</h1>
                        <p className="titulo">{props.auth.email}</p>
                        {!props.auth.emailVerified ? <button className="waves-effect waves-green btn grey lighten-4 black-text btn-small" onClick={() => sendMail(props.auth.email)}> Verificar mail</button> : null}
                        <div>{admin}</div>
                        <br/>
                    </div>
                    <div>
                        <h4 className="center">Mis productos:</h4>
                        <Lista/>
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
export default connect(mapStateToProps)(Profile)