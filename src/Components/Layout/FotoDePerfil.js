import React, { Component } from 'react'
import { connect } from 'react-redux'
import { storage } from '../../Config/fbConfig'
import { subirImagen } from '../../Actions/authActions'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

export class FotoDePerfil extends Component {
    state = {
        Cargando: false,
        imagenPorSubir: false,
        image: null,
        croppedImage: null,
        src: null,
        crop: {
            unit: '%',
            width: 90,
            aspect: 1 / 1
        },
        newUrl: null,
        
    }
    
    componentDidMount = () => {
        this.setState({ image: this.props.profile.foto })
    }
    handleEditPicture = (e) => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click()
    };
    handleImageChange = (e) => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({ src: fileReader.result, imagenPorSubir: true })
        }
        try{
            fileReader.readAsDataURL(e.target.files[0])
        }catch(err){console.log(err);} 
    };
    
    onImageLoaded = image => {
        this.imageRef = image
    }

    onCropChange = (crop) => {
        this.setState({ crop });
    }

    onCropComplete = crop => {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
            this.setState({ croppedImageUrl })
        }
    }
    getCroppedImg(image, crop) {
        const canvas = document.createElement("canvas");
        
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
        })
    }
    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, { type: mime });
        this.setState({ croppedImage: croppedImage })
    }
    handleSubmitImage = () => {
        const uid = this.props.uid;
        console.log("USUARIO: ", uid)
        console.log("IMAGEN STATE: ", this.state.image)
        this.setState({ Cargando: true })
        const upload = storage.ref(`imagenes/${uid}`).put(this.state.croppedImage);
        upload.on("state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref(`imagenes/`)
                    .child(uid)
                    .getDownloadURL()
                    .then(url => {
                        const actual = this.props.profile.foto
                        console.log(url)
                        this.props.subirImagen({ uid, url, actual })
                        this.setState({ Cargando: false, imagenPorSubir: false, src: null, newUrl: url, croppedImage: null })
                        this.leerImagenNueva()
                    })
            })
    }
    leerImagenNueva = () => {
        this.setState({ image: this.state.newUrl })
    }
    render() {
        const { crop, src } = this.state

        return (
            <div className="FDP-Container">
                {src && (
                    <>
                    <ReactCrop
                        src={src}
                        crop={crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                        keepSelection 
                        circularCrop
                    />
                    </>
                )}
                {!src && <img src={this.state.image} alt="" className="responsive-img circle z-depth-3" onClick={this.handleEditPicture} draggable="false" />} <br />
                <input type="file" id="imageInput" onChange={this.handleImageChange} accept=".png, .jpg, .jpeg" hidden="hidden" />
                {!src && <button onClick={this.handleEditPicture} className="btn waves-effect waves-light blue btn-floating "><i className="material-icons">edit</i></button>} <br />

                {this.state.imagenPorSubir && <button onClick={this.handleSubmitImage} className="btn blue"><i className="material-icons">save</i>Subir!</button>}
                <div>{this.state.Cargando && <p className="bold">Subiendo...</p>}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        subirImagen: (data) => dispatch(subirImagen(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FotoDePerfil)