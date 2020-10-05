import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db, fb } from '../../Config/fbConfig'
export class CartItem extends Component {
    state = {
        producto: null,
        titulo: null,
        descripcion: null,
        precio: null,
        foto: null
    }
    componentDidMount = () => {
        this.leerDB()
    }
    leerDB = () => {
        const { item } = this.props
        console.log("ITEM: ", item);
        db.collection('restaurantes').doc(item.restaurante).collection('productos').doc(item.producto).get()
            .then((snapshot) => {
                const info = snapshot.data()
                const id = snapshot.id;
                this.setState({
                    producto: info, id,
                    titulo: snapshot.data().titulo,
                    descripcion: snapshot.data().descripcion,
                    precio: snapshot.data().precio,
                    foto: snapshot.data().foto
                })
            }).catch(error => {
                console.log(error);
            })
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
                restaurante: resto
            })
        }).then(()=>{
            console.log("success!");
        }).catch((err)=> {
            console.log(err);
        })
    }
    render() {
        console.log("STATE: ", this.state);
        const { item } = this.props
        return (
            <div className="row">
                <div className="col s5 l4 xl3">
                    <img className="imagen-carrito-producto" src={this.state.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} alt="Imagen" />
                </div>
                <div className="col s7 l8 xl9" title={item.restaurante + " > " + item.producto + " - [" + item.cantidad + "]"}>
                    <Link to={"/restaurantes/" + item.restaurante + "/" + item.producto}>
                        <p className="titulo-producto"><b>{this.state.titulo}</b> (x{item.cantidad})</p>
                    </Link>

                    <p>${this.state.precio}</p>
                    <button onClick={this.delete} className="red btn"><i className="material-icons">delete</i></button>
                </div>
                <hr />
            </div>

        )
    }
}

export default CartItem
