import React, { Component } from 'react'
// import { db, } from '../../Config/fbConfig'

export class AddToCart extends Component {
    Add = () => {
        const resto = this.props.resto
        const producto = this.props.producto
        console.log(resto, "\n", producto);
    }
    render() {
        console.log(this.props);
        return (
            <button onClick={this.Add} className="btn red btn-wave">
                Añadir al carrito!
            </button>
        )
    }
}

export default AddToCart
