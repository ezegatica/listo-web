import React, { Component } from 'react'
import { db, fb } from '../../Config/fbConfig'
import swal from 'sweetalert'
export class AddToCart extends Component {
    state = {
        mensaje: null,
        cargando: false
    }
    componentWillUnmount() {
        this.setState({ mensaje: null, cargando: false })
    }
    Check = () => {
        if (this.props.profile.cart && this.props.profile.cart.length !== 0) {
            if (this.props.profile.cart && this.props.profile.cart[0].restaurante === this.props.resto) {
                this.Add()

            } else {
                this.Deny()
            }
        } else {
            this.Add()

        }

    }
    Deny = () => {
        swal({
            title: "Advertencia!",
            text: `Tienes productos en el carrito que no son de ${this.props.nombreResto}, si quieres agregar este producto tendras que limpiar el carrito`,
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: 'Cancelar',
                confirm: {
                    text: 'Ok',
                    value: true,
                }
            },
        })
            .then((r) => {
                if (r) {
                    this.ClearCarrito()
                }
            });
    }
    ClearCarrito = () => {
        swal("Carrito vaciado e item añadido!", {
            icon: "success",
            timer: 4000
        });
        db.collection('usuarios').doc(this.props.uid).update({ 
            "cart": fb.firestore.FieldValue.delete() 
        }).then(() => {
            this.Add()
        }).catch((err) => { console.log(err); })
        
    }
    Add = () => {
        this.setState({ cargando: true, mensaje: 'Agregando...' })
        const resto = this.props.resto;
        const producto = this.props.producto;
        const uid = this.props.uid;
        console.log(resto, "\n", producto);
        db.collection("usuarios").doc(uid).update({
            "cart": fb.firestore.FieldValue.arrayUnion({
                restaurante: resto,
                producto: producto,
                cantidad: '1',
            })
        }).then(() => {
            console.log("success!");
            this.setState({ mensaje: "Exito al añadir al carrito!", cargando: false })
        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        // console.log("PROPS: ", this.props);
    }
    render() {
        // console.log(this.props);
        let classBoton = this.state.cargando ? "btn red btn-wave disabled" : "btn red btn-wave"
        return (
            <>
                <button onClick={this.Check} className={classBoton}>
                    Añadir al carrito!
            </button>
                <p>{this.state.mensaje && this.state.mensaje}</p>
            </>
        )
    }
}

export default AddToCart
