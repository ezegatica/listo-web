import React, { Component } from 'react'
import { db, auth } from '../../Config/fbConfig'
import Forbidden from '../Pages/Forbidden'
import {Redirect} from 'react-router-dom'
let resID;
let proID;
// ARCHIVO MOVIDO AL FORM DE Detalles.JS

export class Borrar extends Component {
    componentDidMount() {
        resID = this.props.match.params.id;
        proID = this.props.match.params.productoid;
        db.collection('usuarios').doc(resID).collection('productos').doc(proID).get()
            .then(snapshot => {
                const info = snapshot.data()
                const id = snapshot.id;
                this.setState({ 
                    producto: info, 
                    id,
                    titulo: snapshot.data().titulo,
                    descripcion: snapshot.data().descripcion,
                    precio: snapshot.data().precio 
                })
            }).catch(error => console.log(error))
    }
    borrar(state) {
        this.setState({mensaje: "Borrando..."})
        db.collection('usuarios').doc(resID).collection('productos').doc(proID).delete()
            .then(snapshot => {
                this.setState({
                    mensaje: null,
                    redireccionar: true
                })
            })  
    }
    render() {
        if (auth && this.state){
            if (this.state.redireccionar === true){
                return(
                    <Redirect to="/profile"/>
                )
            }
            if (!auth.currentUser){
                return(
                    <Redirect to="/login"/>
                )
            }
            if (auth.currentUser.uid === this.state.producto.autorUUID){
                // console.log("ES EL DUEÑO")
                return (
                    <div className="center">
                        <h2>{this.state.producto.titulo}</h2>
                        <p className="center">Estas seguro que lo quierasde eliminar?</p>
                        <button onClick={() => this.borrar(this.state)} className="btn red">Si</button>
                        <p>{this.state.mensaje ? <p>{this.state.mensaje}</p>: null}</p>
                    </div>
                )
            }
            else{
                // console.log("NO ES EL DUEÑO")
                return(
                    <Forbidden />
                )
            }
        }
        else{
            return(
                <div>
                    Cargando...
                </div>
            )
        }
    }
}

export default Borrar
