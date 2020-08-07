import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {auth} from '../../Config/fbConfig'
// import {userUUID} from '../../Config/fbConfig'

export class ProductosList extends Component {
    state = {
        productos: null,
            // id: null
    }
    componentDidMount(){
        db.collection('usuarios').doc(auth.currentUser.uid).collection('productos').get()
        .then(snapshot =>{
            const Productos = []
            const IDs = []
            snapshot.forEach(doc =>{
                console.log("DATA:", doc.data())
                const data = doc.data()
                Productos.push(data)
                IDs.push(doc.id)
            })
            this.setState({productos: Productos, id: IDs})
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
                                <span className="card-title" title={producto.titulo}>{producto.titulo}</span>
                                <p>{producto.descripcion}</p>
                                <p>Precio: ${producto.precio}</p>
                                <p>usuario: {producto.autorNombre}</p>
                                <p>ID PRODUCTO: {this.state.id}</p>
                            </div>
                        </div>
                    )
            })}
            </div>
        )
    }
}
export default ProductosList