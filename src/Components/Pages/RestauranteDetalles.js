import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {Link} from 'react-router-dom'
import { authIsReady } from 'react-redux-firebase'

export class RestauranteDetalles extends Component {
    state = {
        productos: null,
        nombreRestaurante: null
    }
    
    componentDidMount(){
        let urlID = this.props.match.params.id;
        console.log(urlID)
        console.log("PROPS: ", this.props)
        db.collection('usuarios').doc(urlID).collection('productos').get()
        .then(snapshot =>{
            const Productos = []
            snapshot.forEach(doc =>{
                const info = doc.data()
                const id = doc.id;
                Productos.push({info, id})
            })
            this.setState({productos: Productos})
            console.log("STATE: ", this.state)
        }).catch(error => console.log(error))
        db.collection('usuarios').doc(urlID).get()
        .then(snapshot => {
            this.setState({nombreRestaurante: snapshot.data().nombre})
        })
    }
    render(state) {
        if (this.state.productos !== null && this.state.nombreRestaurante !== null){
            return (
                <div>
                    <Link to="/restaurantes">Atras</Link>
                    <h4 className="center">{this.state.nombreRestaurante}</h4>
                    <hr/>
                    <h4>Productos: </h4>
                    {this.state.productos && this.state.productos.map (producto =>{
                        return(
                            <div className="card z-depth-0 proyect-summary grey lighten-3" key={producto.id}>
                                <div className="card-content grey-text text-darken-3 lista-proyectos">
                                    <span className="card-title" title={producto.info.titulo}><b>{producto.info.titulo}</b></span>
                                    <p className="red-text">{producto.info.descripcion}</p>
                                    <p><b>Precio: </b>${producto.info.precio}</p>
                                    <p><b>restaurante:</b> {producto.info.autorNombre}</p>
                                    <p><b>ID PRODUCTO: </b>{producto.id}</p>
                                </div>
                            </div>
                        )
                })}
                </div>
            )
        }else{
            return(
                <div className="center">
                    <p>Cargando...</p>
                </div>
            )
        }
        
    }
}
export default RestauranteDetalles