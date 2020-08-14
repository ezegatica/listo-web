import React, { Component } from 'react'
import { db, auth } from '../../Config/fbConfig'
import {Link} from 'react-router-dom'
import {editarProducto} from '../../Actions/projectActions'
import {borrarProducto} from '../../Actions/projectActions'
import {connect} from 'react-redux'

export class Detalles extends Component {
    state = {
        producto: null,
        productoEditarVisible: null,
        productoBorrarVisible: null,
        e404: false
    }

    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    Submit = (e) => { 
        e.preventDefault();
        this.props.editarProducto(this.state)
        this.setState({
            productoEditarVisible: false
        })
        
    }

    Borrar = () => {
        this.props.borrarProducto(this.state)
        this.setState({
            productoBorrarVisible: false
        })
    }
    componentDidMount() {
        this.setState({
            productoEditarVisible: false,
            productoBorrarVisible: false
        })
       

        let resID = this.props.match.params.id;
        let proID = this.props.match.params.productoid;
        db.collection('usuarios').doc(resID).collection('productos').doc(proID).get()
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
        console.log("STATE", this.state)
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

        if (this.state.producto !== null && auth.currentUser.uid){
            // console.log("UID", auth.currentUser.uid)
            // console.log("AUTOR", this.state.producto.autorUUID)
            const botonesCambiar = auth.currentUser.uid === this.state.producto.autorUUID ? 
        // es dueño
        <div> 
            <br/>
            {/* <Link to={"/restaurantes/"+this.state.producto.autorUUID+"/"+this.state.id+"/editar"} className="waves-effect waves-light btn grey lighten-2 black-text"><i className="material-icons right">edit</i>Editar</Link> */}
            <button className="btn grey lighten-2 black-text" onClick={() => this.setState({ productoEditarVisible: true, productoBorrarVisible: false })}><i className="material-icons right">edit</i>Editar</button>
            <br/>
            <br/>
            <button className="btn red lighten-2 white-text" onClick={() => this.setState({ productoEditarVisible: false, productoBorrarVisible: true  })}><i className="material-icons right">delete</i>Borrar</button>
            {/* <Link to={"/restaurantes/"+this.state.producto.autorUUID+"/"+this.state.id+"/borrar"} className="waves-effect waves-light btn red lighten-2 white-text"><i className="material-icons right">delete</i>Borrar</Link> */}
        </div> 
        : //no es dueño
        null

        const formBorrar = this.state.productoBorrarVisible === true ?
        <div className="container row">
            <hr style={{borderTop: "1px dashed red"}}/>
                <h2>{this.state.producto.titulo}</h2>
                <p className="center">Estas seguro que lo quiere eliminar?</p>
                <button onClick={() => this.Borrar(this.state)} className="btn red">Si</button>
        </div>
        :
        null

        const formEditar = this.state.productoEditarVisible === true ?
        <div className="container row">
        <hr style={{borderTop: "1px dashed red"}}/>
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
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="center container">Loading...</div>
            )
        }
        
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        editarProducto: (producto) => dispatch(editarProducto(producto)),
        borrarProducto: (producto) => dispatch(borrarProducto(producto))
    }
}
export default connect(null,mapDispatchToProps)(Detalles)