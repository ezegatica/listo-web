import React, { Component } from 'react'
import { connect } from 'react-redux'
import {storage } from '../../Config/fbConfig'

export class FotoDePerfil extends Component {
    handleImageChange = (e) => {
        const uid = this.props.uid;
        const image = e.target.files[0];
        // const formData = new FormData();
        // formData.append('image', image, image.name);
        // this.props.subirImagen(formData)
        console.log("USUARIO: ", uid)
        const upload = storage.ref(`images/${image.name}`).put(image);
        upload.on("state_changed",
        snapshot => {},
        error => {
            console.log(error)
        },
        () => {
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                console.log(url)
            })
        }
        )
    };

    handleEditPicture = (e) => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click()
    };


    render() {
        const {profile} = this.props;
        return (
            <div className="FDP-Container">
                <img src={profile.foto} alt="" className="responsive-img circle z-depth-3" onClick={this.handleEditPicture}/> <br/>
                <input type="file" id="imageInput" onChange={this.handleImageChange} accept=".png, .jpg, .jpeg" hidden="hidden"/>
                <button onClick={this.handleEditPicture} className="btn waves-effect waves-light blue btn-floating "><i className="material-icons">edit</i></button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(FotoDePerfil)