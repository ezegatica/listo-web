import React, { Component } from 'react'
import '../../css/quanitypicker.css'
import { db, fb } from '../../Config/fbConfig'
import {PreventCartToUpdateTRUE, PreventCartToUpdateFALSE, DisableQuantityFalse, DisableQuantityTrue} from '../../Actions/userActions'
import {connect} from 'react-redux'

export class QuantityPicker extends Component {
    state = {
        boton_decrecer: '',
        boton_incrementar: '',
        clase_botones: "btn btn-small btn-floating white black-text waves-effect waves-black",
        cantidad: this.props.item.cantidad,
        cambiando: false,
        saved: false,
        disabled: false
    }
    leerDB = () => {
        if (this.state.cantidad === '1') {
            this.setState({
                boton_decrecer: this.state.clase_botones + " disabled"
            })
        } else {
            this.setState({
                boton_decrecer: this.state.clase_botones
            })
        }
        if (this.state.cantidad === '9') {
            this.setState({
                boton_incrementar: this.state.clase_botones + " disabled"
            })
        } else {
            this.setState({
                boton_incrementar: this.state.clase_botones
            })
        }
    }
    componentDidMount = () => {
        this.leerDB()
    }
    componentDidUpdate = () => {
        if (this.state.cantidad !== this.props.item.cantidad && this.state.saved) {
            this.setState({
                cambiando: true,
                saved: false
            })
        }
        if (this.state.cantidad === this.props.item.cantidad && this.state.saved) {
            this.setState({
                saved: false,
                cambiando: false
            })

        }

    }
    incremetear() {
        let cantidadINT = parseInt(this.state.cantidad, 10);
        let cantidadNUEVA = (cantidadINT + 1).toString()
        if (this.state.cantidad !== '9') {
            this.setState({
                cantidad: cantidadNUEVA,
                saved: true
            })
            setTimeout(() => {
                this.leerDB()
            }, 10);
        }
    }
    decrecer() {
        let cantidadINT = parseInt(this.state.cantidad, 10);
        let cantidadNUEVA = (cantidadINT - 1).toString()
        if (this.state.cantidad !== '1') {
            this.setState({
                cantidad: cantidadNUEVA,
                saved: true
            })
            setTimeout(() => {
                this.leerDB()
            }, 10);
        }
    }
    guardar = () => {
        this.props.PreventCartToUpdateTRUE()
        console.log("GUARDANDO!");
        this.setState({
            disabled: true
        })
        this.props.DisableQuantityTrue()
        db.collection('usuarios').doc(this.props.uid).update({
            "cart": fb.firestore.FieldValue.arrayRemove({
                cantidad: this.props.item.cantidad,
                producto: this.props.item.producto,
                restaurante: this.props.item.restaurante,
            }),
        }).then(() => {
            db.collection('usuarios').doc(this.props.uid).update({
                "cart": fb.firestore.FieldValue.arrayUnion({
                    cantidad: this.state.cantidad,
                    producto: this.props.item.producto,
                    restaurante: this.props.item.restaurante,
                }),
            }).then(() => {
                this.props.PreventCartToUpdateFALSE()
                this.props.DisableQuantityFalse()
                this.setState({
                    disabled: false
                })
                // window.location.reload();
                console.log("hecho!");
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })


    }
    render() {
        return (
            <span className="quantity-picker">
                <button className={this.state.boton_decrecer} onClick={() => this.decrecer()}>{"-"}</button>
                <span className="cantidad-numero">x{this.state.cantidad}</span>
                <button className={this.state.boton_incrementar} onClick={() => this.incremetear()}>{"+"}</button>
                {this.state.cambiando && <button className="btn btn-small btn-floating black " disabled={this.props.disableButton} onClick={this.guardar}><i className="material-icons white-text black waves-effect waves-light btn btn-floating" disabled={this.props.disableButton}>save</i></button>}
                {/* <button onClick={() => { console.log("ITEM: ", this.props.item); console.log("INCREMENTAR: ", this.state.boton_incrementar); console.log("DECRECER:", this.state.boton_decrecer); console.log("-----------------"); }}>log</button> */}
            </span>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        PreventCartToUpdateTRUE: () => dispatch(PreventCartToUpdateTRUE()),
        PreventCartToUpdateFALSE: () => dispatch(PreventCartToUpdateFALSE()),
        DisableQuantityTrue: () => dispatch(DisableQuantityTrue()),
        DisableQuantityFalse: () => dispatch(DisableQuantityFalse()),
    }
}
const mapStateToProps = (state) => {
    return {
        disableButton: state.usuario.disq
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuantityPicker)

