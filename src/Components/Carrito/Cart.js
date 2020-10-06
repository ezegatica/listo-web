import React, { Component } from 'react'
import CartItem from './CartItem'
export class Cart extends Component {
    state = {
        comentarios: '',
        subtotal: 0
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
    componentDidMount(){
        var options
        var elems = document.querySelectorAll('.modal');
        var instances = window.M.Modal.init(elems, options);
        options = instances //PARA ELIMINAR LA WARNING
        let total = 0
        this.props.profile.cart.forEach(element => {
            var precioInt = parseInt(element.precio, 10)
            total = total + precioInt
        })
        this.setState({
            subtotal: total
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
                <p><b>Subtotal: </b>${this.state.subtotal}</p>
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
                {/* <button className="btn blue" onClick={() => this.pedir()}>Ir a pagar!</button> */}
                <button data-target="modal1" className="btn modal-trigger blue">Ir a pagar!</button>
                {/* POPUP */}
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4><b>Resumen del pedido</b></h4>
                        <p><b>Comentarios para el restaurante</b>: <i>{this.state.comentarios?this.state.comentarios : 'vacio'}</i></p>
                        <p><b>Cantidad de productos: </b>{this.props.profile.cart.length}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn red modal-close" style={{marginRight: '10px'}}>Cancelar</button>
                        <button className="waves-effect waves-green green btn">Pedir</button>
                    </div>
                </div>
                {/* TERMINA POPUP */}
            </>
        )
    }
}

export default Cart
