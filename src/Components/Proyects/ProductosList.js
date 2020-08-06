import React, { Component } from 'react'
import {db, auth} from '../../Config/fbConfig'

export class ProductosList extends Component {
    state = {
        productos: null,
        usuarios: null
    }
    componentDidMount(){
        console.log("PRODUCTOSLIST.JS MOUNTED")

        db.collection('usuarios').get()
            .then(snapshot =>{
                const Usuarios = []
                snapshot.forEach(doc =>{
                    const data = doc.data()
                    Usuarios.push(data)
                })
                this.setState({usuarios: Usuarios})
                console.log("STATE: ", this.state)
                console.log(snapshot)
            }).catch(error => console.log(error))
        
        db.collection('usuarios').doc("QNveMqaLJ2Pgw2gCWWx8SrmF9FJ2").collection('productos').get()
        .then(snapshot =>{
            const Productos = []
            snapshot.forEach(doc =>{
                const data = doc.data()
                Productos.push(data)
            })
            this.setState({productos: Productos})
            console.log("STATE: ", this.state)
            console.log(snapshot)
        }).catch(error => console.log(error))
    }
    render(props) {
        console.log(this.props)
        return (
            <div>
                {this.state.productos && this.state.productos.map (producto =>{
                    return(
                        <div className="card z-depth-0 proyect-summary" key={producto.id}>
                        <div className="card-content grey-text text-darken-3 lista-proyectos">
                            <span className="card-title" title={producto.title}>{producto.title}</span>
                            <p>{producto.content}</p>
                        </div>
                    </div>
                    )
                })}
            </div>
        )
    }
}
export default ProductosList