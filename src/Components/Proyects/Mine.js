import React from 'react'
import Summary from './Summary'
import {Link} from 'react-router-dom'

const Mios = (props) =>{
    
    console.log(props)
    console.log(props.projects)
    console.log(props.auth)
    let Lista;
    // const Lista = projects
    if (props.projects){
        Lista = props.projects.map(proyecto=>{
            if (proyecto.autorUUID === props.auth.uid){
                return(
                    <Link to={"/proyectos/" + proyecto.id} key={proyecto.id}>
                            <Summary project={proyecto}/>
                    </Link>
                )
            }
            else{
                return null
            }
        })
    }
    else{
        return(
            <p>Cargando...</p>
        )
    }

    return (
        <div>{Lista}</div>
    )
}


export default Mios