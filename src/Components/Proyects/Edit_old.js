import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Link} from 'react-router-dom'

const Editar = (props) => {
    const Submit = (e) => { 
        e.preventDefault();
        console.log(e)
    }

    const {proyecto, auth} = props;    
    if (proyecto && auth.isLoaded) {
        let mensajeAutorizado = auth.uid !== proyecto.autorUUID ? 
            <div> 
                <br/>
                <h4>No estas autorizado a editar esta pagina</h4>
                <Link to={"/proyectos/" + props.match.params.id}><h5>Volver al articulo</h5></Link>
                <Link to="/"><h6>Home</h6></Link>
            </div> 
    : //no es dueño
        null

        if (!mensajeAutorizado){
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <form onSubmit={Submit}>
                                <div className="input-field">
                                    <p className="grey-text text-darken-1">Titulo:</p>
                                    <input type="text" id="title" className="card-title" style={{fontSize:"1.5rem"}} value={proyecto.title}/>
                                </div>
                                <br />
                                <div className="input-field">
                                    <p className="grey-text text-darken-1">Contenido:</p>
                                    <textarea id="content" className="materialize-textarea">{proyecto.content}</textarea>
                                </div>
                                <button className="btn pink lighten-1 z-depth-0">
                                    <i className="material-icons left">save</i>
                                    Guardar
                                </button>
                                
                            </form>
                            
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
            <div className="container center">
                <div>{mensajeAutorizado}</div>
            </div>
            )
        }
    }
    else{
        return(
            <div className="container center">
                <p>Cargando...</p>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) =>{
    const id = ownProps.match.params.id;
    const proyectos = state.firestore.data.proyectos;
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
)(Editar)