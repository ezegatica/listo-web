import React, {Component} from 'react'
import List from '../Proyects/List'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import {compose} from 'redux'

class Dashboard extends Component{
    render(){
        //console.log(this.props)
        const {projects} = this.props
        return(
            <div className="dashboard container center">
                <div className="row">
                    <div className="col s12 m12">
                        <List projects={projects}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps= (state) =>{
    return {
        projects: state.firestore.ordered.proyectos
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'proyectos'}
    ])
)(Dashboard)