import React, { Component } from 'react'

export class ConvertToResto extends Component {
    state={
        id: null
    }
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("CAMBIAR A: ",this.state.id);
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit} autoComplete="no">
                 <h5 className="grey-text text-darken-3">Convertir una cuenta de usuario a resto (hacer)</h5>
                <div className="input-field">
                    <label htmlFor="id">ID</label>
                    <input type="text" name="id" id="id" onChange={this.onChange}/>
                </div>
                </form>
            </div>
        )
    }
}

export default ConvertToResto
