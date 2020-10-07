import React, { Component } from 'react'
import { db } from '../../Config/fbConfig';
import CartItem from './CartItem'
import M from 'materialize-css'
import Pedir from './Pedir'
export class Cart extends Component {
    state = {
        comentarios: '',
        subtotal: '0',
        productos: [],
        cargado: false,
        rendered: false,
    }
    componentDidMount = () => {
        var options
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        options = instances
        this.leerDB()
    }
    leerDB = () => {
        let productos = []

        if (this.props.profile.cart) {
            this.props.profile.cart.map((item) => {
                db.collection('restaurantes').doc(item.restaurante).collection('productos').doc(item.producto).get()
                    .then(async (resp) => {
                        const data = resp.data()
                        const { precio, foto, titulo } = data
                        productos.push({ precio: precio, foto: foto, titulo: titulo })
                    }).catch(error => console.log(error))
                return { ...this.state }
            })
            this.setState({ productos })
            this.setState({ cargado: true })
        }
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
        let index = 0
        console.log("STATE: ", this.state);
        if (this.state.productos.length !== 0) {
            console.log("HAY PRODUCTOS!");
            console.log("HAY: ",this.state);
            return (
                <>
                    <h3 className="center">Carrito!</h3>
                    {this.props.profile.cart && this.props.profile.cart.map(item => {
                        index = index + 1;
                        return (
                            <CartItem key={item.restaurante + ":" + item.producto} item={item} auth={this.props.auth} data={this.state.productos[index - 1]} />
                        )

                    })}
                    <br />
                    <p><b>Subtotal: </b>${this.state.subtotal.toString()}</p>
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
                    <Pedir cart={this.props.profile.cart} data={this.state.productos} auth={this.props.auth.currentUser.uid} comentario={this.state.comentarios ? this.state.comentarios : 'Vacío'}/>

                </>
            )
        } else {
            if (!this.state.rendered && this.state.cargado) {
                setTimeout(() => {
                    console.log("uwu");
                    this.setState({
                        rendered: true
                    })
                }, 500);
            }
            console.log("NO HAY PRODUCTOS");
            console.log(this.state);
            return (
                <div className="caja">
                    <div className="centrado">
                        <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                            <div></div><div></div><div></div><div></div>
                        </div></div>
                    </div>
                </div>
            )
        }

    }
}

export default Cart
