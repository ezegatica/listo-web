import React, { Component } from 'react'
import {createProject} from '../../Actions/projectActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export class Create extends Component {
    state = {
        title: '',
        content: ''
    }
    Change = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    Submit = (e) => { 
        e.preventDefault();
        // console.log(this.state)
        this.props.createProject(this.state)
        this.props.history.push("/dashboard");
    }
    render() {
        const {auth} = this.props
        if (!auth.uid){
            return <Redirect to="/login"/>
        } 
        else{
            return (
                <div className="container">
                    <form onSubmit={this.Submit} className="white">
                        <h5 className="grey-text text-darken-3">Entrar</h5>
                        <div className="input-field">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" id="title" onChange={this.Change} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="content">Contenido del Proyecto:</label>
                            <textarea id="content" className="materialize-textarea" onChange={this.Change}></textarea>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">
                                Crear proyecto
                            </button>
                        </div>
                    </form>
                </div>
            )
        }
        
    }
}

const mapStateToProps= (state) =>{
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
