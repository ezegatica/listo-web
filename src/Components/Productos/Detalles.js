import React, { Component } from 'react'
import { db, auth } from '../../Config/fbConfig'
import {Link, Redirect} from 'react-router-dom'
import {editarProducto} from '../../Actions/projectActions'
import {borrarProducto} from '../../Actions/projectActions'
import {connect} from 'react-redux'

export class Detalles extends Component {
    state = {
        producto: null,
        productoEditarVisible: null,
        productoBorrarVisible: null,
        e404: false,
        loading: false
    }

    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    Editar = (e) => { 
        e.preventDefault();
        this.props.editarProducto(this.state)
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
    componentDidMount() {
        this.setState({
            productoEditarVisible: false,
            productoBorrarVisible: false
        })
       

        let resID = this.props.match.params.id;
        let proID = this.props.match.params.productoid;
        db.collection('restaurantes').doc(resID).collection('productos').doc(proID).get()
            .then(snapshot => {
                const info = snapshot.data()
                const id = snapshot.id;
                this.setState({ producto: info, id,
                    titulo: snapshot.data().titulo,
                    descripcion: snapshot.data().descripcion,
                    precio: snapshot.data().precio })
            }).catch(error => {
                console.log(error)
                if (error.message === "Cannot read property 'titulo' of undefined"){
                    console.log("EL ERROR BRO")
                    this.setState({e404: true})
                }
            })
            
    }
    render() {
        if (this.state.e404 === true){
            return(
                <div className="container center">
                    <h3>Error 404</h3>
                    <h5>El producto no ha sido encontrado, puede haber sido movido o eliminado</h5>
                    <Link to="/"><h6>Volver a la home</h6></Link>
                    <Link to="/restaurantes"><h6>Volver a los restaurantes</h6></Link>
                </div>
            )
        }
        if (this.state.producto !== null && !auth.currentUser){ //BUG: SI NO ESTAS LOGUEADO NO TE DEJA VERLO, RE RANCIO ESTE FIX XD
            return(
                <div>
                    <div className="container section project-details">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">{this.state.producto.titulo}</span>
                                <hr />
                                <p>{this.state.producto.descripcion}</p>
                                <p>${this.state.producto.precio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }        
        let btnEdit;
        let btnBorrar;
        let msjCargando;
        if (this.state.loading){
            btnEdit = "btn grey lighten-2 black-text disabled"
            btnBorrar = "btn red lighten-2 white-text disabled"
            msjCargando= "Enviando..."
        }
        else{
            btnEdit = "btn grey lighten-2 black-text"
            btnBorrar = "btn red lighten-2 white-text"
            msjCargando= null
        }
        const Hecho = this.props.hecho ? <Redirect to="/profile" /> : null
        if (this.state.producto !== null && auth.currentUser.uid){

            const botonesCambiar = auth.currentUser.uid === this.state.producto.autorUUID ? 
        // es dueño
        <div> 
            <br/>
            <button className={btnEdit} onClick={() => this.setState({ productoEditarVisible: true, productoBorrarVisible: false })}><i className="material-icons right">edit</i>Editar</button>
            <br/>
            <br/>
            <button className={btnBorrar} onClick={() => this.setState({ productoEditarVisible: false, productoBorrarVisible: true  })}><i className="material-icons right">delete</i>Borrar</button>
        </div> 
        : //no es dueño
        null

        const formBorrar = this.state.productoBorrarVisible === true ?
        <div className="container row center">
            <hr style={{borderTop: "1px dashed red"}}/>
                <h4 className="center">Estas seguro que quiere eliminar el producto?</h4>
                <hr className="barra-fachera"/>
                <button onClick={() => this.Borrar(this.state)} className="btn red boton-form">Si</button>
                <button onClick={() => this.setState({productoBorrarVisible: false})} className="btn grey boton-form">No</button>
        </div>
        :
        null

        const formEditar = this.state.productoEditarVisible === true ?
        <div className="container row">
        <hr style={{borderTop: "1px dashed red"}}/>
            <form onSubmit={this.Editar} className="white col s12">
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
    
        :
        null
            return (
                <div>
                    <div className="container section project-details">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">{this.state.producto.titulo}</span>
                                <hr />
                                <p>{this.state.producto.descripcion}</p>
                                <p>${this.state.producto.precio}</p>
                                <div>{botonesCambiar}</div>
                                <div>{formEditar}</div>
                                <div>{formBorrar}</div>
                                <div>{Hecho}</div>
                                <div className="center">{msjCargando}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="center container"> <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                <div></div><div></div><div></div><div></div>
                </div></div></div>
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
        editarProducto: (producto) => dispatch(editarProducto(producto)),
        borrarProducto: (producto) => dispatch(borrarProducto(producto))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detalles)