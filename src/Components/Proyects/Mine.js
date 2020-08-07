import React from 'react'
import Summary from './Summary'
// import {Link} from 'react-router-dom'

const Mios = (props) =>{
    let Lista;
    // const Lista = projects
    if (props.projects){
        Lista = props.projects.map(proyecto=>{
            if (proyecto.autorUUID === props.auth.uid){
                return(
                    <Summary project={proyecto} key={proyecto.id}/>
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