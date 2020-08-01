import React from 'react'

const Summary = ({project}) =>{
    return(
        <div className="card z-depth-0 proyect-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{project.title}</span>
                    <p>Posted by: Admin</p>
                    <p className="grey-text">El 3 de febrero</p>
                    <p>[DEBUG] ID: {project.id}</p>
                </div>
            </div>

    )
}

export default Summary