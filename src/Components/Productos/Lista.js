import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {auth} from '../../Config/fbConfig'

export class ProductosList extends Component {
    state = {
        productos: null
    }
    componentDidMount(){
        db.collection('usuarios').doc(auth.currentUser.uid).collection('productos').get()
        .then(snapshot =>{
            const Productos = []
            snapshot.forEach(doc =>{
                console.log("AGREGO DATA:", doc.data())
                console.log("PRODUCTO ID DEL AGREGADO:", doc.id)
                const info = doc.data()
                const id = doc.id;
                Productos.push({info, id})
            })
            this.setState({productos: Productos})
            console.log("STATE: ", this.state)
        }).catch(error => console.log(error))
    }
    render(props) {
        return (
            <div>
                {this.state.productos && this.state.productos.map (producto =>{
                    return(
                        <div className="card z-depth-0 proyect-summary grey lighten-3" key={producto.id}>
                            <div className="card-content grey-text text-darken-3 lista-proyectos">
                                <span className="card-title" title={producto.info.titulo}><b>{producto.info.titulo}</b></span>
                                <p className="red-text">{producto.info.descripcion}</p>
                                <p><b>Precio: </b>${producto.info.precio}</p>
                                <p><b>usuario:</b> {producto.info.autorNombre}</p>
                                <p><b>ID PRODUCTO: </b>{producto.id}</p>
                            </div>
                        </div>
                    )
            })}
            </div>
        )
    }
}
export default ProductosList