import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Summary = (props) =>{
    const {project, auth} = props;    
    console.log(props)
    let editarBoton;
    if (auth.isLoaded) {
        editarBoton = auth.uid === project.autorUUID ?     
        <Link to={"/editar/" + project.id}><i className="material-icons pink-text">edit</i></Link>

    : //no es dueño
        null
    }
    return(
        <div className="card z-depth-0 proyect-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{project.title}</span>
                    <p>Por: {project.autorNombre} {project.autorApellido}{editarBoton}</p>
                    <p className="grey-text">{moment (project.createdAt.toDate()).fromNow()}</p>
                </div>
            </div>

    )
}

const mapStateToProps = (state, ownProps) =>{
    return{
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(Summary)