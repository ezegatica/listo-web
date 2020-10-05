import React, { Component } from 'react'
import CartItem from './CartItem'
export class Cart extends Component {
    state = {
        comentarios: ''
    }
    pedir = () => {
        console.log(
            "Pedido:",
            { carrito: this.props.profile.cart },
            { user: this.props.auth.currentUser.uid },
            { comentarios: this.state.comentarios },
        );
    }
    change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        return (
            <>
                <h3 className="center">Carrito!</h3>
                {this.props.profile.cart && this.props.profile.cart.map(item => {
                    return (
                        <CartItem item={item} key={item.restaurante + ":" + item.producto} auth={this.props.auth} />
                    )
                })}
                <br />
                <div className="row " style={{ marginBottom: '0px', paddingBottom: '0px' }}>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12" style={{ marginBottom: '0px', paddingBottom: '0px' }}>
                                <i className="material-icons prefix">message</i>
                                <textarea id="comentarios" className="materialize-textarea" onChange={this.change} maxLength="100"></textarea>
                                <label htmlFor="comentarios">Comentarios para el restaurante</label>
                                <span className="helper-text" style={{ marginTop: '0', paddingTop: '0' }}>{this.state.comentarios.length + "/100"}</span>
                            </div>
                        </div>
                    </form>
                </div>
                <button className="btn blue" onClick={() => this.pedir()}>Ir a pagar!</button>
            </>
        )
    }
}

export default Cart
