import React, { Component } from 'react'

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
        console.log(this.state)
    }
    render() {
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
                </form>
            </div>
        )
    }
}

export default SignUp
