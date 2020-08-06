import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Summary = (props) =>{
    const {project, auth} = props;    
    // console.log(props)
    let editarBoton;
    let adminBadge;
    if (auth.isLoaded) {
        editarBoton = auth.uid === project.autorUUID || props.profile.isAdmin === true ?     
        <Link to={"/editar/" + project.id}><i className="material-icons pink-text" title="Toca para editar el proyecto">edit</i></Link>

    : //no es dueño
        null

        adminBadge = project.autorAdmin === true ? <i className="material-icons green-text" title="El usuario es admin">build</i>
        :
        null
    }
    return(
        <div className="card z-depth-0 proyect-summary">
                <div className="card-content grey-text text-darken-3 lista-proyectos">
                <Link to={"/proyectos/" + project.id} key={project.id}>
                    <span className="card-title" title={project.title}>{project.title}</span>
                </Link>
                    <p>Por: {project.autorNombre} {project.autorApellido}{editarBoton}{adminBadge}</p>
                    <p className="grey-text">{moment (project.createdAt.toDate()).fromNow()}</p>
                </div>
            </div>

    )
}

const mapStateToProps = (state, ownProps) =>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, null)(Summary)