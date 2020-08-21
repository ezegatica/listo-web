import React, { Component } from 'react'
import { nuevoResto } from '../../Actions/authActions'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

    // REMINDER: NO PUSE EL REDIRECT CUANDO ESTAS LOGUEADO, PERO NO TIENE SENTIDO AHORA, HACER CUANDO TE LOGUEE CUANDO CREAS LA CUENTA

export class SignUpResto extends Component {
    state = {
        email: '',
        password: '',
        nombre: ''
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
    }
    render() {
        console.log("PROPS: ",this.props)
        console.log("STATE: ",this.state)
        const {authError} = this.props;
        // if (auth.uid){
        //     return <Redirect to="/profile"/>
        // }
        // else{
            return (
                <div className="container">
                    <form onSubmit={this.Submit} className="white">
                        <h5 className="grey-text text-darken-3">Registrar nuevo Restaurante</h5>
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
                        <div>
                            <Link to="/login">¿Ya tienes cuenta? </Link>
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
        // }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        nuevoResto: (newUser) => dispatch(nuevoResto(newUser))
    }
}



export default connect(null, mapDispatchToProps)(SignUpResto)
