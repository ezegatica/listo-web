import React, { Component } from 'react'
import {editProject} from '../../Actions/projectActions'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
// import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

export class Editar extends Component {
    state = {
        title: '',
        content: '',
        id: ''
    }

    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    x = false;
    UpdateState = (proyecto, proyectoID) => {
        if (this.x === false){
            this.setState({
                title : proyecto.title,
                content: proyecto.content,
                id: proyectoID
            })
            console.log("State synced")
            this.x = true;
        }
        else{
            // console.log("Not able to update anymore")
            return null
        }
    }

    Submit = (e) => { 
        e.preventDefault();
        // console.log(this.props)
        this.props.editProject(this.state)
        this.props.history.push("/profile/");
    }

    render(props) {
        let mensajeAutorizado
        const {auth, proyecto, proyectoID} = this.props
        // console.log("State: ",this.state)
            // if (proyecto){
            //     console.log("Proyecto ID: ", proyectoID)
            // }
        // if (auth.isLoaded){
        //     console.log(auth)
        // }
        
        if (auth.isLoaded && proyecto){
            this.UpdateState(proyecto, proyectoID)
            mensajeAutorizado = auth.uid !== proyecto.autorUUID ? 
            <div> 
                <br/>
                <h4>No estas autorizado a editar esta pagina</h4>
                <Link to="/"><h6>Home</h6></Link>
            </div> 
            : //no es dueño
            null
            if (!mensajeAutorizado) {
                return (
                    <div className="container row">
                        <h5 className="grey-text text-darken-3 col s12">Editar post</h5>
                        <form onSubmit={this.Submit} className="white col s12">
                            {/* <div className="input-field col s6">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" id="title" placeholder={proyecto.title} onChange={this.Change} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="content">Contenido del Proyecto:</label>
                                <textarea id="content" className="materialize-textarea" placeholder={proyecto.content} onChange={this.Change}></textarea>
                            </div> */}
                             <div className="row">
                                <div className="input-field col s12">
                                <input value={this.state.title} id="title" type="text" className="validate card-title" style={{fontSize:20}} onChange={this.Change}/>
                                {/* <input value={proyecto.title} id="title" type="text" className="validate" onChange={this.Change}/> */}
                                <label className="active" htmlFor="title">Titulo</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <textarea value={this.state.content} id="content" type="text" className="validate materialize-textarea" onChange={this.Change}></textarea>
                                {/* <input value={proyecto.content} id="content" type="text" className="validate" onChange={this.Change}/> */}
                                <label className="active" htmlFor="content">Contenido</label>
                                </div>
                            </div>

                            <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">
                                    <i className="material-icons left">save</i>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
            else{
                return(
                    <div className="container center">
                        <div>{mensajeAutorizado}</div>
                    </div>
                )
            }
        } 
        return(
            <div className="container center">
                <p>Cargando...</p>
            </div>
            
        )        
    }
}

const mapStateToProps= (state, ownProps) =>{
    const id = ownProps.match.params.id;
    const proyectos = state.firestore.data.proyectos;
    const proyecto = proyectos ? state.firestore.data.proyectos[id] : null;
    // console.log(state)
    return { 
        proyecto: proyecto, 
        auth: state.firebase.auth,
        proyectoID: ownProps.match.params.id
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        editProject: (project) => dispatch(editProject(project))
    }
}

// export default connect(mapStateToProps)(Editar)

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'proyectos'}
    ])
)(Editar)