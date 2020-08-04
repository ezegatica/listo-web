import React, {Component} from 'react'
import Mios from '../Proyects/Mine'
import List from '../Proyects/List'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends Component{
    render(){
        const {projects, auth} = this.props
        
        if (auth.isLoaded){
            if (!auth.uid){
                return <Redirect to="/login"/>
            } 
            else{
                return(
                    <div className="dashboard container">
                        <div className="row">
                            <div className="col s12 m6">
                                <h4>Proyectos:</h4>
                                <List projects={projects}/>
                            </div>
                            <div className="col s12 m5 offset-m1">
                                <h4>Mis proyectos:</h4>
                                <Mios projects={projects} auth={auth}/>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        else{
            return(
                <div className="center">
                    <p>Cargando...</p>
                </div>
            )
        }
        
        
    }
}

const mapStateToProps= (state) =>{
    return {
        projects: state.firestore.ordered.proyectos,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'proyectos'}
    ])
)(Dashboard)