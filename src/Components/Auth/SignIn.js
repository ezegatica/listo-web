import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../Actions/authActions'
import { Redirect, Link } from 'react-router-dom'

export class SignIn extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value,
            loading: false
        })
    }
    Submit = (e) => { 
        e.preventDefault();
        this.setState({ loading: true })
        this.props.signIn(this.state);
    }
    clearError = () =>{
        
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
        const Enviando = this.state.loading ? <div className="center"><h4>Entrando...</h4></div> : null
        if (auth.uid){
            return <Redirect to="/profile"/>
        }
        else{
            return (
                <div className="container">
                    <form onSubmit={this.Submit} className="white">
                        <h5 className="grey-text text-darken-3">Entrar</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" onChange={this.Change} />
                        </div>
                        <div>
                            <Link to="/recovery" email={"#email"}>¿Olvidaste tu contraseña? </Link> /
                            <Link to="/register"> ¿No tienes cuenta?</Link> <br/>
                        </div>
                        <div className="input-field">
                            <button className={asd}>
                                Login
                            </button>
                            <div className="red-text center">
                                {authError ? <p>{authError}</p>: null}
                            </div>
                            {Enviando}
                        </div>
                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
