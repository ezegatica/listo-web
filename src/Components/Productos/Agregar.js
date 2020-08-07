import React, { Component } from 'react'
import {crearProducto} from '../../Actions/projectActions'
import {connect} from 'react-redux'

export class Create extends Component {
    state = {
        titulo: '',
        descripcion: '',
        precio: ''
    }
    Click = (e) =>{
        e.preventDefault();
        this.props.crearProducto(this.state)
        this.props.history.push("/profile");

    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.Click} className="white">
                    <h5 className="grey-text text-darken-3">Agregar producto</h5> <br />
                    <div className="input-field">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" id="titulo" onChange={this.Change}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="descripcion">Contenido del Proyecto:</label>
                        <textarea id="descripcion" className="materialize-textarea" onChange={this.Change}></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="precio">Precio:</label>
                        <input type="number" id="precio" min="1" onChange={this.Change} placeholder="50"/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">
                            Crear producto
                        </button>
                    </div>
                </form>
            </div>
        )}
    }

const mapStateToProps= (state) =>{
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        crearProducto: (project) => dispatch(crearProducto(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
