import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {Link} from 'react-router-dom'
export class ProductosList extends Component {
    state = {
        productos: null,
    }
    componentDidMount(){
        db.collection('restaurantes').doc(this.props.restaurante).collection('productos').get()
        .then(snapshot =>{
            const Productos = []
            snapshot.forEach(doc =>{
                const info = doc.data()
                const id = doc.id;
                Productos.push({info, id})
            })
            this.setState({productos: Productos})
        }).catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                {this.state.productos && this.state.productos.map (producto =>{
                    return(
                        <div className="card z-depth-0 proyect-summary grey lighten-3 redondo" key={producto.id}>
                            <Link to={"/restaurantes/" + producto.info.autorUUID+"/"+producto.id}>
                            <div className="card-content grey-text text-darken-3 lista-proyectos row">
                                <div className="col s4 m4 l3 xl2">
                                <img src={producto.info.foto || "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/producto.png?alt=media"} alt="" className="responsive-img z-depth-3" draggable="false"/> <br/>
                                </div>
                                <div className="col s8 m8 l9 xl10">
                                <span className="card-title" title={producto.info.titulo}><b>{producto.info.titulo} (COMPONENTE LISTA)</b></span>
                                <p className="red-text">{producto.info.descripcion}</p>
                                <p><b>Precio: </b>${producto.info.precio}</p>
                                <p title={"RESTAURANTE: " + producto.info.autorUUID + "\nPRODUCTO: " + producto.id}><b>Restaurante:</b> {producto.info.autorNombre}</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                    )
            })}
            </div>
        )
    }
}
export default ProductosList