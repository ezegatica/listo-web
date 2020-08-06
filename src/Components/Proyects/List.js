import React from 'react'
import Summary from './Summary'
// import {Link} from 'react-router-dom'

const List = ({projects}) => {
    return(
        <div className="proyect-list section">
            {projects && projects.map(project=>{
                return(
                    <Summary project={project}/>
                )
            })} 
        </div>
    )
}
export default List