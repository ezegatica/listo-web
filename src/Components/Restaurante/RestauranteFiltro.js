import React, { Component } from 'react'
import {db} from '../../Config/fbConfig'
import {Link} from 'react-router-dom'
import Filtros from '../Layout/Filtros'

export class RestaurantesFiltro extends Component {
    state = {
        restaurantes: null
    }
    componentDidMount(){
        db.collection('restaurantes').get()
        .then(snapshot =>{
            const Restaurantes = []
            snapshot.forEach(doc =>{
                const info = doc.data()
                const id = doc.id;
                const cat = doc.data().cat
                const cat2 = doc.data().cat2
                let qwe = this.props.match.params.filtro
                 if (cat === qwe || cat2 === qwe){
                    Restaurantes.push({info, id})
                }
            })
            this.setState({restaurantes: Restaurantes})
        }).catch(error => console.log(error))
    }
    render(props) {
        let Cargando = this.state.restaurantes ? 
        null :
        <div className="caja">
                    <div className="centrado">
                    <div className="loadingio-spinner-bars-jl0izsh3cc"><div className="ldio-at0j3uszb4c">
            <div></div><div></div><div></div><div></div>
            </div></div>                    </div>
                </div>
       
        return (
            <div>
                <h3 className="center">Pedir {this.props.match.params.filtro}!</h3>
                <Filtros />
                {Cargando}
                {this.state.restaurantes && this.state.restaurantes.map (restaurant =>{
                    console.log("RESTAURANT: ",restaurant)
                        return(
                            <div className="card z-depth-0 proyect-summary grey lighten-3" key={restaurant.id}>
                                <div className="card-content grey-text text-darken-3 lista-proyectos">
                                    <Link to={"/restaurantes/" + restaurant.id}><span className="card-title" title={restaurant.info.nombre}>{restaurant.info.nombre}</span></Link>
                                    <br />
                                    <p>Categorias: {restaurant.info.cat}{restaurant.info.cat2 && ", " + restaurant.info.cat2}</p>
                                </div>
                            </div>
                        )
                })}
            </div>
        )
    }
    
}

export default RestaurantesFiltro