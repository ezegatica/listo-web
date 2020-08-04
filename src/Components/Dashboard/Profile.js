import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Mios from '../Proyects/Mine'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'

const Profile = (props) => {
    const {projects} = props
    // console.log(props)
    if (!props.auth.uid && props.auth.isLoaded){
        return <Redirect to="/login"/>
    } 
    else{
        if (props.profile.isLoaded){
            return (
                <div className="container">
                    <div className="carta">
                        <h1>{props.profile.nombre} {props.profile.apellido}</h1>
                        <p class="titulo">{props.auth.email}</p>
                    </div>
                    <div>
                        <h4 className="center">Mis proyectos:</h4>
                        <Mios projects={projects} auth={props.auth}/>
                    </div>
                </div>
                
                
            )}else{
                return(
                    <div className="caja">
                        <div className="centrado"> 
                            <p>Cargando...</p>
                        </div>
                    </div>
                )
            }
    }
}
const mapStateToProps= (state) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        projects: state.firestore.ordered.proyectos
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'proyectos'}
    ])
)(Profile)