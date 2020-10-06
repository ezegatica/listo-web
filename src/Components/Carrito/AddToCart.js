import React, { Component } from 'react'
import { db, fb } from '../../Config/fbConfig'

export class AddToCart extends Component {
    state={
        mensaje: null,
        cargando: false
    }
    componentWillUnmount(){
        this.setState({mensaje: null, cargando: false})
    }
    Add = () => {
        this.setState({cargando: true, mensaje: 'Agregando...'})
        const resto = this.props.resto;
        const producto = this.props.producto;
        const precio = this.props.precio;
        const uid = this.props.uid;
        console.log(resto, "\n", producto);
        db.collection("usuarios").doc(uid).update({
            "cart": fb.firestore.FieldValue.arrayUnion({
                restaurante: resto,
                producto: producto,
                precio: precio,
                cantidad: '1',
            })
        }).then(()=>{
            console.log("success!");
            this.setState({mensaje: "Exito al añadir al carrito!", cargando: false})
        }).catch((err)=> {
            console.log(err);
        })
    }
    render() {
        console.log(this.props);
        let classBoton = this.state.cargando ? "btn red btn-wave disabled" : "btn red btn-wave"
        return (
            <>
            <button onClick={this.Add} className={classBoton}>
                Añadir al carrito!
            </button>
            <p>{this.state.mensaje && this.state.mensaje}</p>
            </>
        )
    }
}

export default AddToCart
