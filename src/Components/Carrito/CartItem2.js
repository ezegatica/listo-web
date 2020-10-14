import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db, fb } from '../../Config/fbConfig'
import M from 'materialize-css'
import QuantityPicker from './QuantityPicker'
export class CartItem extends Component {
    state={
        precio: 0
    }
    delete = () => {
        const { item } = this.props
        const uid = this.props.auth.currentUser.uid;
        const resto = item.restaurante
        const producto = item.producto
        const cantidad = item.cantidad
        console.log(
            "borrar!\n",
            "user: ", uid, "\n",
            "resto: ", resto, "\n",
            "producto: ", producto
        );
        db.collection('usuarios').doc(uid).update({
            "cart": fb.firestore.FieldValue.arrayRemove({
                cantidad: cantidad,
                producto: producto,
                restaurante: resto,
            })
        }).then(()=>{
            console.log("success!");
        }).catch((err)=> {
            console.log(err);
        })
    }
    actualizarPrecio= ()=> {
        var cantidad = this.props.item.cantidad
        var precioInt = parseInt(this.props.data.precio, 10)
        var precio = precioInt * cantidad
        this.setState({
            precio: precio
        })
    }
    componentDidMount = () => {
        var options
        var elems = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems, options);
        options = instances
        // console.log("PROPS: ",this.props);
        this.actualizarPrecio()
    }
    componentDidUpdate=()=>{
        var cantidad = this.props.item.cantidad
        var precioInt = parseInt(this.props.data.precio, 10)
        var precio = precioInt * cantidad
        if (precio !== this.state.precio){
            setTimeout(() => {
                this.actualizarPrecio()
            }, 10);
        }
    }
    render() {
        const { item, data } = this.props
        // console.log("PROPS: ", this.props.data.titulo, this.props);
        // console.log("PROPS CARTITEM", item.producto, this.props);
        return (
            <div className="row">
                <div className="col s4 m4 l4 xl2">
                    <img className="imagen-carrito-producto materialboxed"  src={data.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} alt="Imagen" />
                </div>
                <div className="col s7 m7 l7 xl9" title={item.restaurante + " > " + item.producto + " - [" + item.cantidad + "]"}>
                    <Link to={"/restaurantes/" + item.restaurante + "/" + item.producto}>
                        <p className="titulo-producto"><b>{data.titulo}</b> </p>
                    </Link>
                    <div>
                        <QuantityPicker item={item} indice={this.props.indice} uid={this.props.uid}/>
                    </div>
                    <p>${data.precio} x {item.cantidad}U = <b>${this.state.precio}</b></p>
                </div>
                <div className="col s1 m1 l1 xl1">
                    <div className="right">
                    
                    <button onClick={this.delete} className="red btn"><i className="material-icons">delete</i></button>

                    </div>

                </div>
                <hr />
            </div>

        )
    }
}

export default CartItem
