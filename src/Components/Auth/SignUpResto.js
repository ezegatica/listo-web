import React, { Component } from 'react'
import { nuevoResto } from '../../Actions/authActions'
import {connect} from 'react-redux'

    // REMINDER: NO PUSE EL REDIRECT CUANDO ESTAS LOGUEADO, PERO NO TIENE SENTIDO AHORA, HACER CUANDO TE LOGUEE CUANDO CREAS LA CUENTA

export class SignUpResto extends Component {
    state = {
        email: '',
        password: '',
        nombre: '',
        loading: false
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    Submit = (e) => { 
        e.preventDefault();
        console.log("ENVIANDO!", this.state)
        this.props.nuevoResto(this.state)
        this.setState({
            loading: true
        })
    }
    render() {
        const {authError} = this.props;
        const Cargando = this.state.loading ? <div className="center"><h4>Creando...</h4></div> : null
        let asd;
        if (this.state.loading) {
            asd = "btn pink lighten-1 z-depth-0 disabled"
        }
        else {
            asd = "btn pink lighten-1 z-depth-0"
        }
            return (
                <div className="container">
                    <form onSubmit={this.Submit} className="white" autoComplete="no">
                        <h5 className="grey-text text-darken-3">Registrar nuevo Restaurante</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.Change} required/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" onChange={this.Change} required/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" onChange={this.Change} required/>
                        </div>
                        <div className="input-field">
                            <button className={asd}>
                                Register
                            </button>
                        </div>
                        <div className="center">
                            {Cargando}
                        </div>
                        <div className="red-text center">
                                {authError ? <p>{ authError }</p>: null}
                            </div>
                    </form>
                </div>
            )
        // }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        nuevoResto: (newUser) => dispatch(nuevoResto(newUser))
    }
}



export default connect(null, mapDispatchToProps)(SignUpResto)
