import React from 'react'
import Summary from './Summary'
import {Link} from 'react-router-dom'

const List = ({projects}) => {
    return(
        <div className="proyect-list section">
            {projects && projects.map(project=>{
                return(
                    <Link to={"/proyectos/" + project.id} key={project.id}>
                        <Summary project={project} key={project.id}/>
                    </Link>
                )
            })} 
        </div>
    )
}
export default List