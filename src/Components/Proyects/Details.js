import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import moment from 'moment'
import {Link} from 'react-router-dom'

const Details = (props) => {
    const {proyecto, auth} = props;
    console.log(props)
    if (proyecto && auth.isLoaded) {
        const editarProyecto = auth.uid === proyecto.autorUUID ? 
        // es dueño
        <div> 
            <br/><Link to={"/editar/" + props.match.params.id} proyecto={proyecto} className="waves-effect waves-light btn grey lighten-2 black-text"><i className="material-icons right">edit</i>Editar proyecto</Link>
        </div> 
        : //no es dueño
        null

        return (
            <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{proyecto.title}</span>
                    <p>{proyecto.content}</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Por: {proyecto.autorNombre} {proyecto.autorApellido}</div>
                    <div>{moment (proyecto.createdAt.toDate()).calendar()}</div>
                </div>
                    {console.log("ID AUTOR: ", proyecto.autorUUID)}
                    {console.log("ID LOGGED: ", auth.uid)}
                <div>{editarProyecto}</div>
            </div>
        </div>
        )
        
    }
    else{
        return (
        <div className="container center">
            <p>Cargando...</p>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    const id = ownProps.match.params.id;
    const proyectos = state.firestore.data.proyectos;
    console.log(state)
    const proyecto = proyectos ? proyectos[id] : null;
    return{
        proyecto : proyecto,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'proyectos'}
    ])
)(Details)