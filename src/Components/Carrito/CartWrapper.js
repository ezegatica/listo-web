import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Cart from './Cart2'
import { auth } from '../../Config/fbConfig'
import '../../css/cart.css'
import { db } from '../../Config/fbConfig'
let updated = false
let done = false
export class CartWrapper extends Component {
    state = {
        productos: null,
        cart: null,
        A: false,
        B: false,
        carritoVacio: false,
        carritoChecked: false,
        restaurante: {
            nombre: null,
            foto: null
        }
    }
    componentDidMount =()=>{
        document.title = process.env.REACT_APP_NAME + ' - Carrito';
    }
    leerDB() {
        console.log("pedido leer db");
        if (!done && !this.props.prevent) {
            console.log("APROVED!");
            done = true
            let productos = []
            this.setState({ productos: null })
            if (this.props.profile.cart) {
                this.props.profile.cart.map((item) => {
                    return db.collection('restaurantes').doc(item.restaurante).collection('productos').doc(item.producto).get()
                        .then((resp) => {
                            const data = resp.data()
                            const { precio, foto, titulo } = data
                            productos.push({ precio: precio, foto: foto, titulo: titulo })
                            // console.log("leer");
                        }).catch(error => console.log(error))
                })
                if (this.props.profile.cart.length !== 0) {
                    db.collection('restaurantes').doc(this.props.profile.cart[0].restaurante).get()
                        .then((resp) => {
                            this.setState({ restaurante: { nombre: resp.data().nombre, foto: resp.data().foto } })
                            // console.log(resp.data().nombre);
                        }).catch((err) => {
                            console.log(err);
                        })
                }

                this.setState({ productos, B: true })
            }
        } else {
            console.log("DENIED!");
        }
    }
    leerProfile = () => {
        this.setState({ cart: this.props.profile.cart })
    }
    componentDidUpdate = () => {
        if (!this.props.profile.cart && this.props.profile.isLoaded && !this.state.carritoChecked) {
            this.setState({ carritoVacio: true, carritoChecked: true })
        }
        if (this.props.prevent) {
            updated = true
        }
        if (!this.props.prevent && updated === true) {
            updated = false;
            this.leerDB()
            console.log("STATE AL LEER DE VUELTA: ", this.state);
            console.log('%c LEER LA BASE DE DATOS DE VUELTA ', 'background: #222; color: #bada55');
            this.setState({
                A: false
            })
        }
    }
    componentWillUnmount = () => {
        this.setState({
            // productos: null,
            A: false,
            B: false,
        })
        done = false
    }
    render = () => {
        if (this.state.carritoVacio) {
            return (
                <div className="center container">
                    <h4><b>Carrito vacio :(</b></h4>
                    <p>No hay productos en tu carrito, puedes agregarlos y volver acá cuando los haya!</p>
                    <Link to="/restaurantes">
                        <span className="btn" style={{ borderRadius: '20px', background: '#007AFF' }}>¡Comprar productos!</span>
                    </Link>

                </div>
            )
        }
        // console.log("CART:" ,this.props.profile.cart);
        // console.log("STATE: ", this.state);
        const { A, B } = this.state
        if (this.props.profile.isLoaded && !this.props.profile.isResto && !this.props.profile.isEmpty) {
            // console.log("CART: ", this.props.profile.cart);
            if (this.state.productos && this.state.productos[0]) {
                if (this.props.profile.cart && this.props.profile.cart.length !== this.state.productos.length) {
                    // console.log("EL CARRITO NO ES IGUAL A LOS PRODUCTOS");
                    done = false;
                    if (!this.props.prevent) {
                        this.setState({
                            A: false,
                            B: false,
                        })
                    }
                    this.leerDB()
                }
                if (this.props.prevent) {
                    return (
                        <div className="caja">
                            <div className="centrado">
                                <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
                                    <div></div><div></div><div></div><div></div>
                                </div></div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="container">
                            <Cart profile={this.props.profile} auth={auth} productos={this.state.productos} restaurante={this.state.restaurante} />

                        </div>
                    )
                }
            } else {
                this.leerDB()

                if (!A && B) {
                    setTimeout(() => {
                        console.log("MAGIC UPDATE");
                        this.setState({
                            A: true
                        })
                    }, 500);
                }
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
        } else {
            if (this.props.profile.isResto && this.props.profile.isLoaded) {
                return (<Redirect to="/" />)
            } else {
                if (this.props.profile.isLoaded && this.props.profile.isEmpty) {
                    return (<Redirect to="/" />)
                } else {
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
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        prevent: state.usuario.prev
    }
}
export default connect(mapStateToProps)(CartWrapper)