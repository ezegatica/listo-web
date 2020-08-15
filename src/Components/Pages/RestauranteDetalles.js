import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {Link} from 'react-router-dom'

export class RestauranteDetalles2 extends Component {
    state = {
        productos: null,
        nombreRestaurante: null,
        e404: null
    }
    
    componentDidMount(){
        let urlID = this.props.match.params.id;
        // console.log(urlID)
        db.collection('usuarios').doc(urlID).collection('productos').get()
        .then(snapshot =>{
            const Productos = []
            snapshot.forEach(doc =>{
                const info = doc.data()
                const id = doc.id;
                Productos.push({info, id})
            })
            this.setState({productos: Productos})
        }).catch(error => console.log(error))
        db.collection('usuarios').doc(urlID).get()
        .then(snapshot => {
            this.setState({nombreRestaurante: snapshot.data().nombre})
        }).catch(error => {
            console.log(error)
            if (error.message === "Cannot read property 'nombre' of undefined"){
                console.log("EL ERROR BRO")
                this.setState({e404: true})
            } 
        })
    }
    render() {
        if (this.state.e404 === true){
            return(
                <div className="container center">
                    <h3>Error 404</h3>
                    <h5>El restaurante no ha sido encontrado, puede haber sido movido o eliminado</h5>
                    <Link to="/"><h6>Volver a la home</h6></Link>
                    <Link to="/restaurantes"><h6>Volver a los restaurantes</h6></Link>
                </div>
            )
        }
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
                                <Link to={"/restaurantes/" + producto.info.autorUUID+"/"+producto.id}>
                                <div className="card-content grey-text text-darken-3 lista-proyectos">
                                    <span className="card-title" title={producto.info.titulo}><b>{producto.info.titulo}</b></span>
                                    <p><b>Precio: </b>${producto.info.precio}</p>
                                    <p><b>restaurante:</b> {this.state.nombreRestaurante}</p>
                                    <p><b>ID PRODUCTO: </b>{producto.id}</p>
                                </div>
                                </Link>
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
export default RestauranteDetalles2