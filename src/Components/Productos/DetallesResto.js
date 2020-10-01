import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { editarProducto } from '../../Actions/projectActions'
import { borrarProducto } from '../../Actions/projectActions'
import { connect } from 'react-redux'
import { storage } from '../../Config/fbConfig'
import { subirImagenProducto } from '../../Actions/authActions'
// import { auth } from '../../Config/fbConfig'

export class DetallesResto extends Component {
    state = {
        producto: null,
        productoEditarVisible: null,
        productoBorrarVisible: null,
        loading: false,
        e404: false,
        image: null
    }
    componentDidMount = () => {
        this.setState({
            ...this.props.state
        })
    }

    Change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    EditarProducto = (e) => {
        e.preventDefault();
        let uid = this.props.match.params.id;
        let productoId = this.props.match.params.productoid;
        if (this.state.image) {
            const upload = storage.ref(`productos/${uid}/${productoId}`).put(this.state.image);
            upload.on("state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                },
                () => {
                    storage
                        .ref(`productos/${uid}/`)
                        .child(productoId)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            this.props.editarProducto(this.state)
                            this.props.subirImagenProducto({ uid, productoId, url })
                        })
                })
        } else {
            this.props.editarProducto(this.state)
        }

        this.setState({
            productoEditarVisible: false,
            loading: true
        })

    }
    Borrar = () => {
        this.props.borrarProducto(this.state)
        this.setState({
            productoBorrarVisible: false,
            loading: true
        })
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };
    render() {
        let btnEdit;
        let btnBorrar;
        let msjCargando;
        if (this.state.loading) {
            btnEdit = "btn grey lighten-2 black-text disabled"
            btnBorrar = "btn red lighten-2 white-text disabled"
            msjCargando = "Enviando..."
        }
        else {
            btnEdit = "btn grey lighten-2 black-text"
            btnBorrar = "btn red lighten-2 white-text"
            msjCargando = null
        }

        // FORM BORRAR
        const formBorrar = this.state.productoBorrarVisible === true ?
            <div className="container row center">
                <hr style={{ borderTop: "1px dashed red" }} />
                <h4 className="center">Estas seguro que quiere eliminar el producto?</h4>
                <hr className="barra-fachera" />
                <button onClick={() => this.Borrar(this.state)} className="btn red boton-form">Si</button>
                <button onClick={() => this.setState({ productoBorrarVisible: false })} className="btn grey boton-form">No</button>
            </div>
            :
            null

        // FORM EDITAR1
        return (
            <>
                <div>
                    <br />
                    <button className={btnEdit} onClick={() => this.setState({ productoEditarVisible: true, productoBorrarVisible: false })}><i className="material-icons right">edit</i>Editar</button>
                    <br />
                    <br />
                    <button className={btnBorrar} onClick={() => this.setState({ productoEditarVisible: false, productoBorrarVisible: true })}><i className="material-icons right">delete</i>Borrar</button>
                </div>
                <div>{this.state.productoEditarVisible &&
                    <div className="container row">
                        <hr style={{ borderTop: "1px dashed red" }} />
                        <form onSubmit={this.EditarProducto} className="white col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input value={this.state.titulo} id="titulo" type="text" className="validate card-title" style={{ fontSize: 20 }} onChange={this.Change} />
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
                                    <input value={this.state.precio} id="precio" type="number" className="validate" onChange={this.Change} />
                                    <label className="active" htmlFor="precio">Precio ($)</label>
                                </div>
                            </div>
                            <input type="file" id="imageInput" onChange={this.handleImageChange} accept=".png, .jpg, .jpeg" />
                            <div className="input-field">
                                <button className="btn pink lighten-1 z-depth-0">
                                    <i className="material-icons left">save</i>
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                }</div>
                <div>{formBorrar}</div>
                <div className="center">{msjCargando}</div>
                {this.props.hecho && <Redirect to="/profile" />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hecho: state.project.done
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editarProducto: (producto) => dispatch(editarProducto(producto)),
        borrarProducto: (producto) => dispatch(borrarProducto(producto)),
        subirImagenProducto: (data) => dispatch(subirImagenProducto(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetallesResto)

