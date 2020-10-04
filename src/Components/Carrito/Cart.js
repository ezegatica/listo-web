import React, { Component } from 'react'
import CartItem from './CartItem'
export class Cart extends Component {
    render() {
        return (
            <>
                <h3 className="center">Carrito!</h3>
                {this.props.profile.cart && this.props.profile.cart.map(item => {
                    return (
                        <CartItem item={item} key={item.restaurante+ ":" + item.producto}/>
                    )
                })}
            </>
        )
    }
}

export default Cart
