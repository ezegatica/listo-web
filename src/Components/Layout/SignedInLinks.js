import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../Actions/authActions'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
export class SignedInLinks extends Component {
    state = {
        profile: this.props.profile,
        esResto: false
    }
    componentDidMount = () => {
        if (this.props.profile.isResto) {
            this.setState({
                esResto: true
            })
        } else {
            this.setState({
                esResto: false
            })
        }
    }
    componentDidUpdate = () => {
        if (this.props.profile !== this.state.profile) {
            this.setState({
                profile: this.props.profile
            })
            const horaActual = Date.now()
            if (this.props.profile.refresh.hora + 10000 > horaActual) {
                if (this.state.esResto) {
                    // NOTIFICACIONES RESTAURANTE
                    switch (this.props.profile.refresh.tipo) {
                        case 'avisar_cancelado':
                            M.toast({
                                html:
                                    `<span className="red">
                            ${this.props.profile.refresh.titulo}</span>`
                            });
                            break;
                        case 'no_refresh':
                            break
                        case 'nuevo_pedido':
                            M.toast({
                                html:
                                    `<span>
                                ${this.props.profile.refresh.titulo}</span><a href="/pedidos"><button class="btn-flat toast-action">Ver</button></a>`
                            });
                            break;
                        default:
                            break;
                    }
                } else {
                    // NOTIFICACIONES USUARIO
                    switch (this.props.profile.refresh.tipo) {
                        case 'cambio_estado':
                            M.toast({
                                html:
                                    `<span>
                            ${this.props.profile.refresh.titulo}</span><a href="/pedidos"><button class="btn-flat toast-action">Ver</button></a>`
                            });
                            break;

                        default:
                            break;
                    }
                }
            }
        }
    }
    render() {
        const { props } = this
        const panelAdmin = props.profile.isAdmin ?
            <li><NavLink to="/admin">Admin</NavLink></li> : null
        const panelResto = props.profile.isResto ?
            <li><NavLink to="/productos/nuevo">Nuevo producto</NavLink></li> : null
        let carrito;
        if (props.profile.cart) {
            if (props.profile.cart.length > 0) {
                carrito = <li><NavLink to="/carrito">Carrito ({props.profile.cart.length})</NavLink></li>
            } else {
                carrito = null
            }
        } else {
            carrito = null
        }

        return (
            <div className="nav-wrapper grey darken-3">
                <ul className="right hide-on-med-and-down">
                    {panelResto}
                    {panelAdmin}
                    <li><NavLink to="/restaurantes">Restaurantes</NavLink></li>
                    {carrito}
                    <li><NavLink to="/pedidos">Pedidos</NavLink></li>
                    <li><NavLink to="/" onClick={props.signOut}>Logout</NavLink></li>
                    <li><NavLink to="/profile" className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
                </ul>
                <ul className="show-on-medium-and-down hide-on-med-and-up right">
                    <li><NavLink to="/" style={{ padding: 0, margin: 0 }} onClick={props.signOut}><i className="material-icons left white-text">logout</i></NavLink></li>
                    <li><Link to="/profile" className="btn btn-floating red lighten-1" style={{ padding: 0, margin: 0 }}>{props.profile.initials}</Link></li>
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)