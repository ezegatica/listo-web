import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../../Config/fbConfig'
export class ShowRestaurante extends Component {
    state= {
        logged: null,
        uid: null
    }
    componentDidMount = () => {
        if (this.props.perfil.isEmpty && this.props.perfil.isLoaded){
            this.setState({logged: false})
        }
        else{
            this.setState({logged: true, uid: auth.currentUser.uid})
        }
    }
    render() {
        const {restaurant} = this.props
        // const {
        //     logged, 
        //     uid,
        // } = this.state
        return (
            <div className="card z-depth-0 proyect-summary grey lighten-3">
             <div className="card-content grey-text text-darken-3 lista-proyectos row">
                 <div className="col s4 m3 l2 xl1">
                     <img src={restaurant.info.foto || 'https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/user.png?alt=media'} alt={"IMG"} draggable="false" className=" circle z-depth-3 imagen-lista" /> <br />
                 </div>
                 <div className="col s8 m9 l10 xl11">
                     <Link to={"/restaurantes/" + restaurant.id}><span className="card-title" title={restaurant.info.nombre}>{restaurant.info.nombre}</span></Link>
                     <p>Categorias: {restaurant.info.cat}{restaurant.info.cat2 && ", " + restaurant.info.cat2}</p>
                 </div>
             </div>
         </div>
        )
    }
}

export default ShowRestaurante
