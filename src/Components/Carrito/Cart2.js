import React, { Component } from 'react'
import { db, fb } from '../../Config/fbConfig';
import CartItem from './CartItem2'
import M from 'materialize-css'
import Pedir from './Pedir'
import swal from 'sweetalert'

export class Cart extends Component {
    state = {
        comentarios: '',
        subtotal: 0,
        productos: [],
        cargado: false,
        rendered: false,
    }
    
    componentDidMount = () => {
        var options
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, options);
        options = instances
        this.updateSubtotal()      
    }
    updateSubtotal = () => {
        // console.log("updating subtotal");
        let total = 0        
        this.props.productos.forEach(element => {
            var precioInt = parseInt(element.precio, 10)
            total = total + precioInt
        })
        if (total !== this.state.subtotal){
            console.log("no es igual, cambiando");
            this.setState({
                subtotal: total
            })
        }else{
            console.log("es igual, no cambiando");
        }
        // console.log("TOTAL: ", total);
        // console.log("SUBTOTAL: ", this.state.subtotal);
        // console.log("TODOS LOS PRODUCTOS: ", this.props.productos);        
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
            console.log("NO HAY CARRITO!");
            return (
                <div className="center container">
                    <h4><b>Carrito vacio!</b></h4>
                    <p>No hay productos en tu carrito, puedes agregarlos y volver acá cuando los haya!</p>
                </div>
            )
        } else {
            return (
                <>
                    <h3 className="center">Carrito!   <span><i onClick={() => this.borrarCarrito()} className="material-icons delete">delete_forever</i></span></h3>
                    {this.props.profile.cart && this.props.profile.cart.map(item => {
                        index = index + 1;
                        return (
                            <div className="cart-item" key={item.restaurante + ":" + item.producto}>
                                <CartItem item={item} auth={this.props.auth} data={this.props.productos[index - 1]} />
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
                                    <textarea id="comentarios" className="materialize-textarea" onChange={this.change} maxLength="100"></textarea>
                                    <label htmlFor="comentarios">Comentarios para el restaurante</label>
                                    <span className="helper-text" style={{ marginTop: '0', paddingTop: '0' }}>{this.state.comentarios.length + "/100"}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    {this.state.subtotal !== '0' && <Pedir cart={this.props.profile.cart} data={this.props.productos} auth={this.props.auth.currentUser.uid} comentario={this.state.comentarios ? this.state.comentarios : 'Vacío'} subtotal={this.state.subtotal.toString()}/>}
                    <br/>
                </>
            )
        }



    }
}

export default Cart
