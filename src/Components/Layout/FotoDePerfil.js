import React, { Component } from 'react'
import { connect } from 'react-redux'
import {storage } from '../../Config/fbConfig'
import {subirImagen} from '../../Actions/authActions'

export class FotoDePerfil extends Component {
    state = {
        Cargando: false,
        image: null
    }
    
    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0],
        })
        setTimeout(() => {
            this.uploadImage()
        }, 100);
        
    };
    uploadImage = () => {
        const uid = this.props.uid;
        console.log("USUARIO: ", uid)
        console.log("IMAGEN STATE: ", this.state.image)
        this.setState({Cargando: true})
        const upload = storage.ref(`imagenes/${uid}`).put(this.state.image);
        upload.on("state_changed",
        snapshot => {},
        error => {
            console.log(error)  
        },
        () => {
            storage
            .ref(`imagenes/`)
            .child(uid)
            .getDownloadURL()
            .then(url => {
                console.log(url)
                this.props.subirImagen({uid, url})
                this.setState({Cargando: false})
            })
        })
    }

    handleEditPicture = (e) => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click()
    };

    render() {
        return (
            <div className="FDP-Container">
                <img src={this.props.profile.foto} alt="" className="responsive-img circle z-depth-3" onClick={this.handleEditPicture} draggable="false"/> <br/>
                <input type="file" id="imageInput" onChange={this.handleImageChange} accept=".png, .jpg, .jpeg" hidden="hidden"/>
                <button onClick={this.handleEditPicture} className="btn waves-effect waves-light blue btn-floating "><i className="material-icons">edit</i></button> <br/>
                <div>{this.state.Cargando && <p className="bold">Subiendo...</p>}</div> 
                {/* ^^^^^^HACER QUE SOLO APAREZCA AL CARGAR! */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        subirImagen: (data) => dispatch(subirImagen(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FotoDePerfil)