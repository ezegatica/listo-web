import React, { Component } from 'react'
import { signUp } from '../../Actions/authActions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

    // REMINDER: NO PUSE EL REDIRECT CUANDO ESTAS LOGUEADO, PERO NO TIENE SENTIDO AHORA, HACER CUANDO TE LOGUEE CUANDO CREAS LA CUENTA

export class SignUp extends Component {
    state = {
        email: '',
        password: '',
        nombre: '',
        apellido: ''
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    Submit = (e) => { 
        e.preventDefault();
        this.props.signUp(this.state)
    }
    render() {
        const {authError, auth} = this.props;
        if (auth.uid){
            return <Redirect to="/dashboard"/>
        }
        else{
            return (
                <div className="container">
                    <form onSubmit={this.Submit} className="white">
                        <h5 className="grey-text text-darken-3">Registrarse</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text" id="apellido" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">
                                Register
                            </button>
                        </div>
                        <div className="red-text center">
                                {authError ? <p>{ authError }</p>: null}
                            </div>
                    </form>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
