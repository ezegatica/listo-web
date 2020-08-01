import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signIn} from '../../Actions/authActions'
import { Redirect } from 'react-router-dom'

export class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    Submit = (e) => { 
        e.preventDefault();
        this.props.signIn(this.state);
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
                        <h5 className="grey-text text-darken-3">Entrar</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">
                                Login
                            </button>
                            <div className="red-text center">
                                {authError ? <p>{authError}</p>: null}
                            </div>
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
