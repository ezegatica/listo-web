import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PaginaResto from '../Pedidos/Restaurante/PaginaResto'
import PaginaUsuario from '../Pedidos/Usuario/PaginaUsuario'
export class PaginaPedidos extends Component {
    render() {
        const { auth, profile } = this.props
        if (this.props.auth.isLoaded && !this.props.auth.isEmpty && this.props.profile && this.props.profile.isLoaded && !this.props.profile.isEmpty) {
            if (profile.isResto) {
                return (
                    <PaginaResto profile={profile} auth={auth}/>
                )
            } else {
                return (
                    <div>
                        <PaginaUsuario profile={profile} auth={auth}/>
                    </div>
                )
            }
        } else {
            if (auth.isLoaded && auth.isEmpty){
                return (
                    <Redirect to="/login" />
                )
            }else{
                return (
                    <div>
                        CARGANDO...
                    </div>
                )
            }
            
        }

    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(PaginaPedidos)
// export default PaginaPedidos
