import React, { Component } from 'react'
import { crearProducto } from '../../Actions/projectActions'
import { subirImagenProducto } from '../../Actions/authActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { storage } from '../../Config/fbConfig'
// import { auth } from '../../Config/fbConfig'

export class Create extends Component {
    state = {
        titulo: "",
        descripcion: "",
        precio: "",
        foto: null,
        loading: false
    }
    Click = (e) => {
        e.preventDefault();
        this.props.crearProducto(this.state, this.props.auth.uid)
        this.setState({ loading: true })
    }
    Change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleImageChange = (e) => {
        console.log(e.target.files[0])
        this.setState({ foto: e.target.files[0] })
    }
    componentDidUpdate = () => {
        if (this.props.id !== null) {
            const uid = this.props.auth.uid
            const productoId = this.props.id
            const upload = storage.ref(`productos/${uid}/${productoId}`).put(this.state.foto);
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
                            this.props.subirImagenProducto({ uid, productoId, url })
                        })
                })

        }
    }
    render() {
        let asd;
        if (this.state.loading) {
            asd = "btn pink lighten-1 z-depth-0 disabled"
        }
        else {
            asd = "btn pink lighten-1 z-depth-0"
        }

        const Hecho = this.props.hecho ? <Redirect to="/profile" /> : null
        const Enviando = this.state.loading && !this.props.hecho ? <div className="center"><h4>Creando...</h4></div> : null
        if (this.props.auth.isLoaded && this.props.auth.uid && this.props.profile.isLoaded && this.props.profile.isResto) {
            return (
                <div className="container">
                    <form onSubmit={this.Click} className="white">
                        <h5 className="grey-text text-darken-3">Agregar producto</h5> <br />
                        <div className="input-field">
                            <label htmlFor="titulo">Titulo</label>
                            <input type="text" id="titulo" onChange={this.Change} required={true} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="descripcion">Contenido del Proyecto:</label>
                            <textarea id="descripcion" className="materialize-textarea" onChange={this.Change} required={true}></textarea>
                        </div>
                        <div className="input-field">
                            <label htmlFor="precio">Precio:</label>
                            <input type="number" id="precio" min="1" onChange={this.Change} placeholder="50" required={true} />
                        </div>
                        <input type="file" id="imageInput" onChange={this.handleImageChange} accept=".png, .jpg, .jpeg" />

                        <div className="input-field">
                            <button className={asd}>
                                Crear producto
                                </button>
                            {Enviando}
                            {Hecho}
                        </div>
                    </form>
                </div>
            )
        }
        else {
            if (this.props.auth.isLoaded && this.props.auth.uid && this.props.profile.isLoaded && !this.props.profile.isResto) {
                return (
                    <Redirect to="/profile" />
                )
            }
            if (this.props.auth.isLoaded && !this.props.auth.uid) {
                return (
                    <Redirect to="/login" />
                )
            }
            else {
                return (
                    <div className="caja">
                        <div className="centrado">
                            <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                                <div></div><div></div><div></div><div></div>
                            </div></div>
                        </div>
                    </div>)
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        hecho: state.auth.done,
        id: state.project.id,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        crearProducto: (data, uid) => dispatch(crearProducto(data, uid)),
        subirImagenProducto: (data) => dispatch(subirImagenProducto(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
