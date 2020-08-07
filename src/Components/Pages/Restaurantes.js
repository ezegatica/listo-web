import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
// import {auth} from '../../Config/fbConfig'

export class Restaurantes extends Component {
    state = {
        restaurantes: null
    }
    componentDidMount(){
        console.log("RESTAURANTES.JS MOUNTED")
        console.log("AUTH :")
        
        db.collection('usuarios').get()
        .then(snapshot =>{
            const Restaurantes = []
            snapshot.forEach(doc =>{
                const data = doc.data()
                Restaurantes.push(data)
            })
            this.setState({restaurantes: Restaurantes})
            console.log("STATE: ", this.state)
            console.log("SNAPSHOT :", snapshot)
        }).catch(error => console.log(error))
    }
    render(props) {
        return (
            <div>
                <h3 className="center">RESTAURANTES:</h3>
                {this.state.restaurantes && this.state.restaurantes.map (restaurant =>{
                    // console.log("producto: ", producto)
                    console.log("RESTAURANT :", restaurant);
                    return(
                        <div className="card z-depth-0 proyect-summary grey lighten-3" key={restaurant}>
                            <div className="card-content grey-text text-darken-3 lista-proyectos">
                                <span className="card-title" title={restaurant.nombre}>{restaurant.nombre}</span>
                                <p>Descripcion: {restaurant.descripcion}</p>
                                <p>ID RESTAURANTE: [deberia estar aca]</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Restaurantes