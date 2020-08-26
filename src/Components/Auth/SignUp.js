import React, { Component } from 'react'
import { signUp, Clear } from '../../Actions/authActions'
import {connect} from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

    // REMINDER: NO PUSE EL REDIRECT CUANDO ESTAS LOGUEADO, PERO NO TIENE SENTIDO AHORA, HACER CUANDO TE LOGUEE CUANDO CREAS LA CUENTA

export class SignUp extends Component {
    state = {
        email: '',
        password: '',
        nombre: '',
        apellido: '',
        loading: false
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value,
            loading: false
        })
        this.props.clear()
    }
    Submit = (e) => { 
        e.preventDefault();
        this.setState({ loading: true })
        this.props.signUp(this.state)
    }
    render() {
        const {authError, auth} = this.props;
        let asd;
        if (this.state.loading) {
            asd = "btn pink lighten-1 z-depth-0 disabled"
        }
        else {
            asd = "btn pink lighten-1 z-depth-0"
        }
        const Enviando = this.state.loading ? <div className="center"><h4>Registrando...</h4></div> : null
        if (auth.uid){
            return <Redirect to="/profile"/>
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
                        <div>
                            <Link to="/login">¿Ya tienes cuenta? </Link>
                       </div>
                        <div className="input-field">
                            <button className={asd}>
                                Register
                            </button>
                        </div>
                        
                        <div className="red-text center">
                                {authError ? <p>{ authError }</p>: null}
                            </div>
                            {Enviando}
                    </form>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        clear: () => dispatch(Clear())
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        hecho: state.auth.done
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
