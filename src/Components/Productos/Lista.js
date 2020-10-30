import React, { Component } from 'react'
import { db, fb } from '../../Config/fbConfig'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
export class ProductosList extends Component {
    state = {
        productos: null,
    }
    componentDidMount() {
        db.collection('restaurantes').doc(this.props.restaurante).collection('productos').get()
            .then(snapshot => {
                const Productos = []
                snapshot.forEach(doc => {
                    const info = doc.data()
                    const id = doc.id;
                    Productos.push({ info, id })
                })
                this.setState({ productos: Productos })
            }).catch(error => console.log(error))
    }
    agregarCarrito = (indice) => {
        const profile = this.props.profile
        if (this.props.profile.cart && this.props.profile.cart.length !== 0) {
            if (profile.cart && profile.cart[0].restaurante === this.state.productos[indice].info.autorUUID) {
                this.Add(indice)
            } else {
                this.Deny(indice)

            }
        } else {
            this.Add(indice)

        }
    }
    Deny = (indice) => {
        swal({
            title: "Advertencia!",
            text: `Tienes productos en el carrito que no son de ${this.state.productos[0].info.autorNombre}, si quieres agregar este producto tendras que limpiar el carrito`,
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: 'Cancelar',
                confirm: {
                    text: 'Ok',
                    value: true,
                }
            },
        })
            .then((r) => {
                if (r) {
                    this.ClearCarrito(indice)
                }
            });
    }
    ClearCarrito = (indice) => {
        const uid = this.props.auth.uid
        swal("Carrito vaciado e item añadido!", {
            icon: "success",
            timer: 4000
        });
        db.collection('usuarios').doc(uid).update({
            "cart": fb.firestore.FieldValue.delete()
        }).then(() => {
            this.Add(indice)
        }).catch((err) => { console.log(err); })

    }
    Add = (indice) => {
        this.setState({ cargando: true })
        const uid = this.props.auth.uid
        db.collection("usuarios").doc(uid).update({
            "cart": fb.firestore.FieldValue.arrayUnion({
                restaurante: this.state.productos[indice].info.autorUUID,
                producto: this.state.productos[indice].id,
                cantidad: '1',
            })
        }).then(() => {
            swal({
                title: "Exito",
                text: "Productos añadidos al carrito!",
                icon: 'success',
                timer: 5000
            })
            this.setState({ cargando: false })
        }).catch(error => console.log(error))
    }
    render() {
        let indice = 0
        let showAdd
        let ClaseDetalles
        if (this.props.profile.isEmpty) {
            showAdd = false
            ClaseDetalles = "middle"
        }
        if (!this.props.profile.isEmpty && this.props.profile.isResto) {
            showAdd = false
            ClaseDetalles = "middle"
        }
        if (!this.props.profile.isEmpty && !this.props.profile.isResto) {
            showAdd = true
            ClaseDetalles = "left"
        }
        if (this.props.profileView) {
            return (
                <div>
                    {this.state.productos && this.state.productos.map (producto =>{
                        return(
                            <div className="card proyect-summary redondo sombrita" key={producto.id}>
                                <Link to={"/restaurantes/" + producto.info.autorUUID+"/"+producto.id}>
                                <div className="card-content grey-text text-darken-3 lista-proyectos row">
                                    <div className="col s4 m4 l3 xl2">
                                    <img src={producto.info.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} alt="" className="responsive-img z-depth-3" draggable="false"/> <br/>
                                    </div>
                                    <div className="col s8 m8 l9 xl10">
                                    <span className="card-title" title={producto.info.titulo}><b>{producto.info.titulo}</b></span>
                                    <p className="red-text">{producto.info.descripcion}</p>
                                    <p><b>Precio: </b>${producto.info.precio}</p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        )
                })}
                </div>
            )
        } else {
            return (
                <div className="row center">
                    {this.state.productos && this.state.productos.map(producto => {
                        indice = indice + 1
                        let i = indice - 1
                        return (
                            <div className="card col s12 m6 l3 redondo center " key={producto.id}>
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img alt={`imagen de ${producto.info.titulo}`} src={producto.info.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} className="responsive-img activator" style={{ objectFit: "cover", height: '20vh', width: '100%' }} />
                                </div>
                                <div className="card-content" style={{ paddingTop: 10 }}>
                                    <span className="card-title activator grey-text text-darken-4"><b className="activator">{producto.info.titulo}</b></span>
                                    <p><b>${producto.info.precio}</b></p>
                                    <br />
                                    <p >
                                        <span style={{ float: ClaseDetalles, padding: '10px', background: 'grey', color: 'white', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer' }} className="activator">Detalles</span>
                                        {showAdd && <span style={{ float: "right", padding: '10px', background: '#007aff', color: 'white', borderRadius: '10px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => this.agregarCarrito(i)}>Agregar al carrito</span>}
                                    </p>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4"><b>{producto.info.titulo}</b><i className="material-icons right">close</i></span>
                                    <hr />
                                    <p>{producto.info.descripcion}</p>
                                    <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', textAlign: 'center', marginBottom: 20 }}>
                                        <Link to={"/restaurantes/" + producto.info.autorUUID + "/" + producto.id}>
                                            <span style={{ padding: '10px', background: '#007aff', color: 'white', borderRadius: 10 }}>Mas informacion!</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }
}
export default ProductosList