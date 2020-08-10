import React, { Component } from 'react'
import { db, auth } from '../../Config/fbConfig'
import {Link} from 'react-router-dom'

export class Detalles extends Component {
    state = {
        producto: null,
    }

    componentDidMount() {
        let resID = this.props.match.params.id;
        let proID = this.props.match.params.productoid;
        db.collection('usuarios').doc(resID).collection('productos').doc(proID).get()
            .then(snapshot => {
                const info = snapshot.data()
                const id = snapshot.id;
                this.setState({ producto: info, id })
            }).catch(error => console.log(error))
    }
    render() {
        // if (!auth.currentUser){
        //     auth.signInAnonymously()
        //     console.log("singed in anon")
        // }
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
            console.log("UID", auth.currentUser.uid)
            console.log("AUTOR", this.state.producto.autorUUID)
            const editarProducto = auth.currentUser.uid === this.state.producto.autorUUID ? 
        // es dueño
        <div> 
            <br/>
            <Link to={"/restaurantes/"+this.state.producto.autorUUID+"/"+this.state.id+"/editar"} className="waves-effect waves-light btn grey lighten-2 black-text"><i className="material-icons right">edit</i>Editar</Link>
            <br/>
            <br/>
            <Link to={"/restaurantes/"+this.state.producto.autorUUID+"/"+this.state.id+"/borrar"} className="waves-effect waves-light btn red lighten-2 white-text"><i className="material-icons right">delete</i>Borrar</Link>
        </div> 
        : //no es dueño
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
                                <div>{editarProducto}</div>
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

export default Detalles
