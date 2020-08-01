import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const Details = (props) => {
    const {proyecto} = props;
    if (proyecto) {
        return (
            <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{proyecto.title}</span>
                    <p>{proyecto.content}</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Posted by: {proyecto.autorNombre} {proyecto.autorApellido}</div>
                    <div>3 de Febrero</div>
                </div>
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
    // console.log(state);
    const proyecto = proyectos ? proyectos[id] : null
    return{
        proyecto : proyecto
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'proyectos'}
    ])
)(Details)