import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Cart from './Cart2'
import { auth } from '../../Config/fbConfig'
import '../../css/cart.css'
import { db } from '../../Config/fbConfig'
let done = false
export class CartWrapper extends Component {
    state = {
        productos: null,
        A: false,
        B: false,
    }
    leerDB() {
        // console.log("leyendo db");
        if (!done) {
            // console.log("EJECUTANDO FUNCION!");
            done = true
            let productos = []

            if (this.props.profile.cart) {
                this.props.profile.cart.map((item) => {
                    db.collection('restaurantes').doc(item.restaurante).collection('productos').doc(item.producto).get()
                        .then(async (resp) => {
                            const data = resp.data()
                            const { precio, foto, titulo } = data
                            productos.push({ precio: precio, foto: foto, titulo: titulo })
                        }).catch(error => console.log(error))
                    return null
                })
                this.setState({ productos, B: true })
            }
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
    render =()=> {
        const { A, B } = this.state

        if (this.props.profile.isLoaded && !this.props.profile.isResto && !this.props.profile.isEmpty) {
            if (this.state.productos && this.state.productos[0]) {
                if(this.props.profile.cart.length !== this.state.productos.length){
                    done=false;
                    this.setState({
                        A: false,
                        B: false,
                    })
                    this.leerDB()
                }
                return (
                    <div className="container">
                        <Cart profile={this.props.profile} auth={auth} productos={this.state.productos} />
                    </div>
                )
            } else {
                this.leerDB()

                if (!A && B) {
                    setTimeout(() => {
                        console.log("owo");
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
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(CartWrapper)