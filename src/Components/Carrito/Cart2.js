import React, { Component } from 'react'
import { db, fb } from '../../Config/fbConfig';
import CartItem from './CartItem2'
import M from 'materialize-css'
import Pedir from './Pedir'
import swal from 'sweetalert'
import { connect } from 'react-redux'
let hacer = false

export class Cart extends Component {
    state = {
        comentarios: '',
        subtotal: 0,
        cantidad_total: 0
    }

    componentDidMount = () => {
        // console.log("PROPS CART: ", this.props);
        var options
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        options = instances
        this.updateSubtotal()
    }
    componentDidUpdate = () => {
        // console.log("PROPS CART ", this.props);
        // console.log("RESTAURANTE: ", "a");
        // console.log("HACER: ",hacer);
        if (this.props.prevent) {
            // console.log("EN PREVENIR");
            hacer = true
        }
        if (!this.props.prevent && hacer) {
            // console.log("EN UPDATE");
            hacer = false
            this.updateSubtotal()
        }
    }
    updateSubtotal = () => {
        // console.log("updating subtotal");
        let total = 0
        var indice = 0
        var cantidadTotal = 0
        this.props.productos.forEach(element => {
            var cantidad = parseInt(this.props.profile.cart[indice].cantidad, 10)
            cantidadTotal = cantidadTotal + cantidad
            var precioInt = parseInt(element.precio, 10)
            total = total + (precioInt * cantidad)
            indice = indice + 1
        })
        // console.log("CANTIDAD TOTAL: ",cantidadTotal);

        if (total !== this.state.subtotal) {
            // console.log("no es igual, cambiando subtotal");
            this.setState({
                subtotal: total,
                cantidad_total: cantidadTotal
            })
        } else {
            // console.log("es igual, no cambiando");
        }
    }
    borrarCarrito = () => {
        const uid = this.props.auth.currentUser.uid
        swal({
            title: "Advertencia!",
            text: "Quieres vaciar el carrito?",
            icon: "warning",
            buttons: {
                cancel: "Cancelar",
                ok: {
                    text: 'Ok',
                    value: true
                }
            },
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    db.collection('usuarios').doc(uid).update({ "cart": fb.firestore.FieldValue.delete() }).then(() => {
                    }).catch((err) => { console.log(err); })
                    swal("Carrito vaciado!", {
                        icon: "success",
                        timer: 2000
                    });
                } else {

                }
            });
    }
    change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        let index = 0
        if (!this.props.profile.cart || this.props.profile.cart.length === 0) {
            // console.log("NO HAY CARRITO!");
            return (
                <div className="center container">
                    <h4><b>Carrito vacio :(</b></h4>
                    <p>No hay productos en tu carrito, puedes agregarlos y volver acá cuando los haya!</p>
                    <span className="btn">¡Comprar productos!</span>
                </div>
            )
        } else {
            const apellido = this.props.profile.apellido ? this.props.profile.apellido : ''
            const nombreYapellido = this.props.profile.nombre + " " + apellido
            return (
                <   >
                    <h3 className="center">Carrito!   <span><i onClick={() => this.borrarCarrito()} className="material-icons delete">delete_forever</i></span></h3>
                    <div className="center container resto-cart-container">
                        <h5 className="center"><span>{this.props.restaurante.nombre}</span></h5>
                        <img src={this.props.restaurante.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media"} alt={`Foto de ${this.props.restaurante.nombre}`} className="circle responsive-img imagen-restaurante-carrito" />
                    </div>
                    {this.props.profile.cart && this.props.profile.cart.map(item => {
                        index = index + 1;
                        return (
                            <div className="cart-item" key={item.restaurante + ":" + item.producto}>
                                <CartItem item={item} auth={this.props.auth} data={this.props.productos[index - 1]} indice={index - 1} uid={this.props.auth.currentUser.uid}/>
                            </div>
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
                                    <textarea id="comentarios" className="materialize-textarea" onChange={this.change} maxLength="200"></textarea>
                                    <label htmlFor="comentarios">Comentarios para el restaurante</label>
                                    <span className="helper-text" style={{ marginTop: '0', paddingTop: '0' }}>{this.state.comentarios.length + "/200"}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    {this.state.subtotal !== '0' && <Pedir cart={this.props.profile.cart} data={this.props.productos} auth={this.props.auth.currentUser.uid} comentario={this.state.comentarios ? this.state.comentarios : 'Vacío'} subtotal={this.state.subtotal.toString()} restaurante={this.props.restaurante} cantidad_items={this.state.cantidad_total} name={nombreYapellido}/>}
                    <br />
                </>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        prevent: state.usuario.prev
    }
}
export default connect(mapStateToProps)(Cart)
