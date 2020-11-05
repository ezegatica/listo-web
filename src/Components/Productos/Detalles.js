import React, { Component } from 'react'
import { db, auth } from '../../Config/fbConfig'
import E404Producto from '../Pages/404Producto'
import DetallesResto from './DetallesResto'
import { connect } from 'react-redux'
import AddToCart from '../Carrito/AddToCart'
import { Link } from 'react-router-dom'
export class Detalles extends Component {
    state = {
        producto: null,
        productoEditarVisible: null,
        productoBorrarVisible: null,
        loading: false,
        e404: false,
        image: null
    }

    componentDidMount() {
        document.title = process.env.REACT_APP_NAME + ' - Producto';
        this.setState({
            productoEditarVisible: false,
            productoBorrarVisible: false
        })
        let resID = this.props.match.params.id;
        let proID = this.props.match.params.productoid;
        db.collection('restaurantes').doc(resID).collection('productos').doc(proID).get()
            .then(snapshot => {
                const info = snapshot.data()
                const id = snapshot.id;
                document.title = process.env.REACT_APP_NAME + ' - ' + info.autorNombre + ' > ' + info.titulo;
                this.setState({
                    producto: info, id,
                    titulo: snapshot.data().titulo,
                    descripcion: snapshot.data().descripcion,
                    precio: snapshot.data().precio,
                    foto: snapshot.data().foto
                })
            }).catch(error => {
                console.log(error);
                this.setState({ e404: true })
            })

    }
    render() {
        if (this.state.e404) {
            return (<E404Producto />)
        }
        if (this.state.producto !== null && !auth.currentUser) {
            //BUG: SI NO ESTAS LOGUEADO NO TE DEJA VERLO, RE RANCIO ESTE FIX XD
            return (
                <div className="producto-detalles">
                    <p style={{ float: 'left' }}><Link to={"/restaurantes/" + this.props.match.params.id}>Atras</Link></p>
                    <div className="container section">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <div className="center">
                                    <img src={this.state.producto.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} alt="" className="responsive-img z-depth-3 imagen-producto" /> <br />
                                </div>
                                <span className="card-title">{this.state.producto.titulo}</span>
                                <hr />
                                <p>{this.state.producto.descripcion}</p>
                                <p>${this.state.producto.precio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (this.state.producto !== null && auth.currentUser.uid) {
            // PAGINA LOGUEADO
            return (
                <div className="producto-detalles">
                    <Link to={"/restaurantes/" + this.props.match.params.id}><p className="container">Atras</p></Link>
                    <div className="container section">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <div className="center">
                                    <img src={this.state.producto.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} alt="" className="responsive-img z-depth-3 imagen-producto" /> <br />
                                </div>
                                <span className="card-title">{this.state.producto.titulo}</span>
                                <hr />
                                <p>{this.state.producto.descripcion}</p>
                                <p>${this.state.producto.precio}</p>
                                {auth.currentUser.uid === this.state.producto.autorUUID && <DetallesResto state={this.state} match={this.props.match} />}
                                {this.props.profile.isLoaded && !this.props.profile.isEmpty && !this.props.profile.isResto && <AddToCart resto={this.props.match.params.id} producto={this.props.match.params.productoid} uid={auth.currentUser.uid} precio={this.state.producto.precio} profile={this.props.profile} nombreResto={this.state.producto.autorNombre} />}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            // LOGUEADO //
            if (!this.state.e404) {
                return (
                    <div className="center container">
                        <div className="loadingio-spinner-bars-jl0izsh3cc">
                            <div className="ldio-at0j3uszb4c">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <E404Producto />
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Detalles)
