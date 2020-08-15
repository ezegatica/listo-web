import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
// import {auth} from '../../Config/fbConfig'
import {Link} from 'react-router-dom'

export class Restaurantes extends Component {
    state = {
        restaurantes: null
    }
    componentDidMount(){
       
        db.collection('usuarios').get()
        .then(snapshot =>{
            const Restaurantes = []
            snapshot.forEach(doc =>{
                const info = doc.data()
                const id = doc.id;
                Restaurantes.push({info, id})
            })
            this.setState({restaurantes: Restaurantes})

        }).catch(error => console.log(error))
    }
    render(props) {
        return (
            <div>
                <h3 className="center">RESTAURANTES:</h3>
                {this.state.restaurantes && this.state.restaurantes.map (restaurant =>{
                    return(
                        <div className="card z-depth-0 proyect-summary grey lighten-3" key={restaurant.id}>
                            <div className="card-content grey-text text-darken-3 lista-proyectos">
                                <Link to={"/restaurantes/" + restaurant.id}><span className="card-title" title={restaurant.info.nombre}>{restaurant.info.nombre}</span></Link>
                                <p>ID RESTAURANTE: {restaurant.id}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Restaurantes