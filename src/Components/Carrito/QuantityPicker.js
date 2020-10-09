import React, { Component } from 'react'
import '../../css/quanitypicker.css'
export class QuantityPicker extends Component {
    state = {
        boton_decrecer: '',
        boton_incrementar: '',
        clase_botones: "btn btn-small btn-floating white black-text waves-effect waves-black",
        cantidad: this.props.item.cantidad,
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
    // componentDidUpdate=() => {
    //     if (this.state.cantidad !== this.props.item.cantidad){
    //         this.setState({cantidad: this.props.item.cantidad})
    //         setTimeout(() => {
    //             this.leerDB()
    //         }, 10);
    //     }
    // }
    incremetear() {
        let cantidadINT = parseInt(this.state.cantidad, 10);
        let cantidadNUEVA = (cantidadINT + 1).toString()
        if (this.state.cantidad !== '9') {
            this.setState({
                cantidad: cantidadNUEVA
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
                cantidad: cantidadNUEVA
            })
            setTimeout(() => {
                this.leerDB()
            }, 10);
        }
    }
    render() {

        return (
            <span className="quantity-picker">
                <button className={this.state.boton_decrecer} onClick={()=>this.decrecer()}>{"-"}</button>
                <span className="cantidad-numero">x{this.state.cantidad}</span>
                <button className={this.state.boton_incrementar} onClick={() => this.incremetear()}>{"+"}</button>
                {/* <button onClick={() => { console.log("ITEM: ", this.props.item); console.log("INCREMENTAR: ", this.state.boton_incrementar); console.log("DECRECER:", this.state.boton_decrecer); console.log("-----------------"); }}>log</button> */}
            </span>
        )
    }
}

export default QuantityPicker
