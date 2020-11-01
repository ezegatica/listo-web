import React, { Component } from 'react'
// import ShowRestaurante from '../Restaurante/ShowRestaurante'
import Preview from '../Posts/Preview'
import { connect } from 'react-redux'
// import { auth } from '../../Config/fbConfig'

export class Home extends Component {
    componentDidMount =()=>{
        document.title = process.env.REACT_APP_NAME + '';
    }
    render() {
        // const restaurant = {
        //     id: "Fw0JV2TtEXN3xHM2JD1q9EtN9Ov2",
        //     info: {
        //         alias: "beni",
        //         cat: "pollo",
        //         cat2: "sushi",
        //         foto: "https://firebasestorage.googleapis.com/v0/b/prueba-proyecto-tic.appspot.com/o/imagenes%2FFw0JV2TtEXN3xHM2JD1q9EtN9Ov2?alt=media&token=7b26bfd6-9b8e-45c0-8f47-b14a4eace3dc",
        //         id: " Fw0JV2TtEXN3xHM2JD1q9EtN9Ov2",
        //         initials: "B",
        //         nombre: "BENI POLLO FRITO"
        //     }
        // }
        return (
            <div>
                <div className="container">
                    <h4>Publicaciones del equipo:</h4>
                    <div className="container">
                        <div className="row">
                            <Preview />
                        </div>
                    </div>
                    {/* <br />
                    <hr />
                    <h4>Restaurante destacado:</h4>
                    <div className="container">
                        <div className="row">
                            {auth.currentUser && this.props.profile.isLoaded && <ShowRestaurante restaurant={restaurant} perfil={this.props.profile}/>}
                        </div>
                    </div> */}
                </div>
    
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps, null)(Home)