import React from 'react'
import Lista from '../Productos/Lista'
import { auth } from '../../Config/fbConfig'
import { Link } from 'react-router-dom'
import ListaPedidos from '../Pedidos/Restaurante/ListaPedidos'
import '../../css/pedidos.css'
function PerfilResto(props) {
    return (
        <div className="row">
            <div className="col s12 l6 pedidos-wrapper">
                <Link to="/pedidos">
                    <h4 className="center">Pedidos: </h4>
                </Link>
                <ListaPedidos uid={auth.currentUser.uid} profile={props.profile}/>
            </div>
            <div className="col s12 l6">
                <h4 className="center">Mis productos:</h4>
                <Lista restaurante={auth.currentUser.uid} auth={auth} profile={props.profile} profileView={true}/>
            </div>


        </div>
    )
}

export default PerfilResto
