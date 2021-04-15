
import React, { Component } from 'react'
import M from 'materialize-css'
import '../css/area.css'
import '../css/home.css'

export class Area extends Component {
    state = {
        titulo: null,
        cuerpo: null,
        imagen: require("../assets/ingenieriaimg.jpg"),
        area: this.props.match.params.area,
    }
    componentDidMount = () => {
        var elems = document.querySelectorAll('.slider');
        M.Slider.init(elems, {
        });
        //SE EJECUTA UNA VEZ CUANDO SE MUESTRA EL ARCHIVO
        this.informacion()
    }
    informacion = () => {
        //FUNCION PARA MOSTRAR LA INFORMACION DEPENDIENDO DE EL AREA
        switch (this.props.match.params.area) {
            case 'ingenieria':
                this.setState({
                    titulo: 'Ingenieria!!!',
                    cuerpo: 'Bienvenidos al area de ingenieria, pasa a tomar un mat',
                    imagen: require("../assets/ingenieriaimg.jpg")
                })
                break
            case 'medicina':
                this.setState({
                    titulo: 'medicina!!!',
                    cuerpo: 'Bienvenidos al area de medicina, pasa a tomar un mat',
                    imagen: require("../assets/medicinaimg.jpg")
                })
                break
            case 'sociales':
                this.setState({
                    titulo: 'Ciencias sociales!!!',
                    cuerpo: 'Bienvenidos al area de ciencias sociales, pasa a tomar un mat',
                    imagen: require("../assets/csimg.jpg")
                })
                break
            case 'naturales':
                this.setState({
                    titulo: 'Ciencias naturales!!!',
                    cuerpo: 'Bienvenidos al area de ciencias naturales, pasa a tomar un mat',
                    imagen: require("../assets/cnimg.jpg")
                })
                break
            case 'exactas':
                this.setState({
                    titulo: 'Ciencias exactas!!!',
                    cuerpo: 'Bienvenidos al area de ciencias exactas, pasa a tomar un mat',
                    imagen: require("../assets/ceximg.jpg")
                })
                break
            case 'economicas':
                this.setState({
                    titulo: 'Ciencias economicas!!!',
                    cuerpo: 'Bienvenidos al area de ciencias economicas, pasa a tomar un mat',
                    imagen: require("../assets/ceimg.jpg")
                })
                break
            case 'artes':
                this.setState({
                    titulo: 'Arte!!!!!',
                    cuerpo: 'Bienvenidos al area de arte',
                    imagen: require("../assets/arteimg.jpg")
                })
                break
            case 'arquitectura':
                this.setState({
                    titulo: 'arquitectura!!!!!',
                    cuerpo: 'Bienvenidos al area de arquitectura',
                    imagen: require("../assets/arquitecturaimg.jpg")
                })
                break
            default:
                this.setState({
                    titulo: 'NO EXISTE NINGUN AREA!',
                    cuerpo: 'no existe ningun area con ese nombre!',
                    imagen: null,
                })
                break;
        }
    }
    componentDidUpdate = () => {
        //LO QUE HAGO ES PREGUNTAR SI LA ULTIMA AREA QUE TENGO REGISTRADA ES IGUAL A LA QUE TENGO ABIERTA ACTUALMENTE, LO QUE HACE ES QUE CUANDO CAMBIO DE PAGINA, SE ACTUALIZE LA INFORMACION
        if (this.state.area !== this.props.match.params.area) {
            this.setState({
                area: this.props.match.params.area
            })
            //Y LE HAGO UN SETSTATE DE VUELTA PARA QUE QUEDE REGISTRADA LA AREA ACTUAL
            this.informacion()
            //Y CON ESTA FUNCION ACTUALIZO LA INFMROACION
        }
    }
     render() {
        return (
            <div className="area" >
                <div className="area-img-wrapper">
                    <img src={this.state.imagen} style={{width:"100%", height:"100%", boxShadow: 'inset 0px 0px 0px 1000px rgba(1, 16, 40, 0.63)'}} alt=""/> 
                     <div class="top-left">{this.state.titulo}</div>
                </div>
                </div>
        )
    }
}

export default Area
