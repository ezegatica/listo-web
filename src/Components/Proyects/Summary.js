import React from 'react'
import moment from 'moment'

const Summary = ({project}) =>{
    return(
        <div className="card z-depth-0 proyect-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{project.title}</span>
                    <p>Por: {project.autorNombre} {project.autorApellido}</p>
                    <p className="grey-text">{moment (project.createdAt.toDate()).fromNow()}</p>
                </div>
            </div>

    )
}

export default Summary