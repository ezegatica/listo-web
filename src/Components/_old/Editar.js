import React, { Component } from 'react'
import { db,auth } from '../../Config/fbConfig'
import {editarProducto} from '../../Actions/projectActions'
import {connect} from 'react-redux'
import Forbidden from '../Pages/Forbidden'
import { Redirect } from 'react-router-dom'
import { Detalles } from '../../Components/Productos/Detalles'

// ARCHIVO MOVIDO AL FORM DE Detalles.JS

export class Editar extends Component {
    state = {
        producto: null,
        titulo: null,
        descripcion: null,
        precio: null
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    Submit = (e) => { 
        e.preventDefault();
        this.props.editarProducto(this.state)
        this.props.history.push("/profile/");
    }
    componentDidMount() {
        let resID = this.props.match.params.id;
        let proID = this.props.match.params.productoid;
        db.collection('usuarios').doc(resID).collection('productos').doc(proID).get()
            .then(snapshot => {
                const info = snapshot.data()
                const id = snapshot.id;
                this.setState({ producto: info, id })
                this.setState({ 
                    titulo: snapshot.data().titulo,
                    descripcion: snapshot.data().descripcion,
                    precio: snapshot.data().precio
                })
            }).catch(error => console.log(error))
    }
    render() {
        if (!auth.currentUser && this.state.producto !== null){
            return(
                <Redirect to="/login"/>
            )
        }
        if (this.state.producto !== null && auth.currentUser.uid && this.state.titulo !== null){
            // console.log("STATE:", this.state)
            // console.log("UID", auth.currentUser.uid)
            // console.log("AUTOR", this.state.producto.autorUUID)
            if (auth.currentUser.uid === this.state.producto.autorUUID){
            return (
                <div className="container row">
                        <h5 className="grey-text text-darken-3 col s12">Editar post</h5>
                        <form onSubmit={this.Submit} className="white col s12">
                             <div className="row">
                                <div className="input-field col s12">
                                <input value={this.state.titulo} id="titulo" type="text" className="validate card-title" style={{fontSize:20}} onChange={this.Change}/>
                                <label className="active" htmlFor="titulo">Titulo</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <textarea value={this.state.descripcion} id="descripcion" type="text" className="validate materialize-textarea" onChange={this.Change}></textarea>
                                <label className="active" htmlFor="descripcion">Contenido</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input value={this.state.precio} id="precio" type="number" className="validate" onChange={this.Change}/>
                                <label className="active" htmlFor="precio">Precio ($)</label>
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
            }else{
                return(
                    <Forbidden />
                )
            }
        }
        else{
            return(
                <div className="center container">Loading...</div>
            )
        }
        
    }
}

const mapStateToProps= (state) =>{
    return {
        hecho: state.project.done
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        editarProducto: (producto) => dispatch(editarProducto(producto))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editar)