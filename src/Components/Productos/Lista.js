import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {auth} from '../../Config/fbConfig'
// import {userUUID} from '../../Config/fbConfig'

export class ProductosList extends Component {
    state = {
        productos: null
    }
    componentDidMount(){
        console.log("PRODUCTOSLIST.JS MOUNTED")
        console.log("AUTH :", auth.currentUser.uid)
        
        db.collection('usuarios').doc(auth.currentUser.uid).collection('productos').get()
        .then(snapshot =>{
            const Productos = []
            snapshot.forEach(doc =>{
                const data = doc.data()
                Productos.push(data)
            })
            this.setState({productos: Productos})
            console.log("STATE: ", this.state)
            console.log("SNAPSHOT :", snapshot)
        }).catch(error => console.log(error))
    }
    render(props) {
        // console.log(this.props)
        return (
            <div>
                {this.state.productos && this.state.productos.map (producto =>{
                    // console.log("producto: ", producto)
                    return(
                        <div className="card z-depth-0 proyect-summary grey lighten-3" key={producto.createdAt}>
                            <div className="card-content grey-text text-darken-3 lista-proyectos">
                                <span className="card-title" title={producto.titulo}>{producto.titulo}</span>
                                <p>{producto.descripcion}</p>
                                <p>Precio: ${producto.precio}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default ProductosList